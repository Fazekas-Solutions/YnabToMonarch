import state from '../../state.js';
import { navigate, goBack, persistState } from '../../router.js';
import { renderButtons } from '../../components/button.js';
import { renderDropdown, initDropdowns } from '../../components/dropdown.js';
import { openOptionPicker } from '../../components/optionPicker.js';
import { renderAccountSettingsEditor } from '../../components/accountSettingsEditor.js';
import { bestNameMatch, nameMatchScore } from '../../utils/fuzzyMatch.js';
import { monarchApi } from '../../api/monarchApi.js';
import { createNavigationBar, createStepHeader } from '../../utils/navigationBar.js';
import { CSV_COLUMNS, COLUMN_MAPPING, MONARCH_FIELDS } from '../../../shared/generateCsv.js';
import {
  collectValueCounts,
  hasBlankValues,
  indexByName,
  defaultCategoryValue,
  defaultTagValue,
  CATEGORY_NEW,
  CATEGORY_NEW_INCOME,
  TAG_NEW,
  TAG_IGNORE,
  UNCATEGORIZED,
  ACCOUNT_CREATE_NEW,
  IMPORT_PRIORITIES,
  IMPORT_PRIORITY_DEFAULT,
} from '../../../shared/mappingHelpers.js';

// A Monarch account scores at least this against the YNAB account name to be
// surfaced in the dropdown's "Suggested matches" section. Lower than the
// auto-seed threshold (0.6) so near-misses still bubble up as suggestions.
const SUGGEST_THRESHOLD = 0.45;

const STEPS = [
  { key: 'accounts', label: 'Accounts' },
  { key: 'customize', label: 'New accounts' },
  { key: 'priority', label: 'Priority' },
  { key: 'categories', label: 'Categories' },
  { key: 'tags', label: 'Tags' },
];

// Maps a generated CSV column header to the transaction field it's built from,
// so the category/tag steps can read the distinct values of whichever column
// the user mapped. Columns with no per-transaction source (Account, Original
// Statement) are intentionally absent.
const HEADER_TO_TX_FIELD = {
  Date: 'Date',
  Merchant: 'Merchant',
  Category: 'Category',
  Notes: 'Notes',
  Amount: 'Amount',
  Tags: 'Tags',
};

function esc(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export default async function initMonarchMappingView() {
  const token = state.credentials?.apiToken;
  if (!token) {
    return navigate('/login', true);
  }

  const includedEntries = Object.entries(state.accounts || {}).filter(([, a]) => a.included);
  const includedAccounts = includedEntries.map(([, a]) => a);

  // Working selections, persisted across step navigation.
  const columnSelections = new Map();   // monarch field key -> CSV column index ('' = don't import)
  const accountSelections = new Map();  // CSV account name (state key) -> Monarch account id | ACCOUNT_CREATE_NEW
  const categorySelections = new Map(); // CSV category value -> mapping choice
  const tagSelections = new Map();       // CSV tag value -> mapping choice
  const prioritySelections = new Map();  // CSV account name (mapped to existing) -> import priority
  let stepIndex = 0;

  MONARCH_FIELDS.forEach(f => {
    const idx = COLUMN_MAPPING[f.key];
    columnSelections.set(f.key, typeof idx === 'number' ? idx : '');
  });

  // Monarch-sourced options.
  let categoryGroups = [];   // [{ id, name, type, categories: [{id,name,icon}] }]
  let tags = [];             // [{ id, name, color }]
  let monarchAccounts = [];  // [{ id, displayName }]
  let flatCategories = [];   // flattened categories for default matching
  let existingCatByName = new Map();
  let existingTagByName = new Map();
  let uncategorizedName = UNCATEGORIZED;
  let loadError = null;
  let accountsError = null;

  const $content = document.getElementById('mappingContent');
  const $header = document.getElementById('mappingHeader');
  const $stepper = document.getElementById('mappingStepper');
  const $nav = document.getElementById('mappingNav');
  const $bulkBar = document.getElementById('mappingBulkBar');

  renderLoading();

  // Load categories/tags and accounts in parallel; a failure of one shouldn't
  // block the other.
  const [optionsRes, accountsRes] = await Promise.allSettled([
    monarchApi.fetchMappingOptions(token),
    monarchApi.fetchMonarchAccounts(token),
  ]);

  if (optionsRes.status === 'fulfilled') {
    categoryGroups = optionsRes.value.categoryGroups || [];
    tags = optionsRes.value.tags || [];
  } else {
    console.warn('Could not load Monarch categories/tags:', optionsRes.reason?.message);
    loadError = optionsRes.reason?.message || 'Failed to load categories/tags';
  }

  if (accountsRes.status === 'fulfilled') {
    monarchAccounts = accountsRes.value.accounts || [];
  } else {
    console.warn('Could not load Monarch accounts:', accountsRes.reason?.message);
    accountsError = accountsRes.reason?.message || 'Failed to load accounts';
  }

  flatCategories = categoryGroups.flatMap(g => g.categories.map(c => ({ ...c, groupType: g.type })));
  existingCatByName = indexByName(flatCategories);
  existingTagByName = indexByName(tags);
  uncategorizedName = existingCatByName.get('uncategorized') || UNCATEGORIZED;

  render();

  // ------------------------------------------------------------- derivations

  function txFieldFor(fieldKey) {
    const idx = columnSelections.get(fieldKey);
    if (typeof idx !== 'number') return null;
    return HEADER_TO_TX_FIELD[CSV_COLUMNS[idx]] || null;
  }

  // ---------------------------------------------------------------- rendering

  function render() {
    renderStepper();
    // The floating bulk bar is per-step; hide it before each step renders and
    // let the step re-show it once something is selected.
    hideBulkBar();
    const step = STEPS[stepIndex].key;
    if (step === 'accounts') renderAccounts();
    else if (step === 'customize') renderCustomize();
    else if (step === 'priority') renderPriority();
    else if (step === 'categories') renderCategories();
    else renderTags();
    renderButtons();
  }

  function renderLoading() {
    $stepper.innerHTML = '';
    setHeader('Preparing your import', 'Loading your Monarch categories and tags…');
    $content.innerHTML = `
      <div class="flex justify-center py-16">
        <div class="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    `;
    $nav.innerHTML = '';
  }

  function renderStepper() {
    $stepper.innerHTML = STEPS.map((s, i) => {
      const isCurrent = i === stepIndex;
      const isDone = i < stepIndex;
      const circle = isDone
        ? 'bg-green-500 text-white'
        : isCurrent
          ? 'bg-blue-600 text-white'
          : 'bg-gray-200 text-gray-500';
      const labelClass = isCurrent ? 'text-gray-900 font-semibold' : 'text-gray-500';
      return `
        <div class="flex items-center gap-2">
          <span class="w-7 h-7 rounded-full flex items-center justify-center text-sm font-semibold ${circle}">
            ${isDone ? '✓' : i + 1}
          </span>
          <span class="text-xs sm:text-sm ${labelClass} hidden sm:inline">${s.label}</span>
        </div>
        ${i < STEPS.length - 1 ? '<div class="w-5 sm:w-10 h-px bg-gray-300"></div>' : ''}
      `;
    }).join('');
  }

  // The title/subtitle live in the shared step header (same component every
  // other step uses). It also renders the icon back button (id="backBtn"); the
  // header is re-rendered per step, so re-wire the control each time. The
  // stepper sits in its own element above this header — see the view template.
  function setHeader(title, subtitle) {
    $header.innerHTML = createStepHeader({
      title,
      subtitle,
      backText: 'Back',
      titleId: 'mappingTitle',
      subtitleId: 'mappingSubtitle',
    });
    if (loadError) {
      document.getElementById('mappingSubtitle')?.insertAdjacentHTML('afterend',
        `<p class="text-amber-600 text-xs sm:text-sm mt-1">Couldn't load your existing Monarch categories/tags, so items default to “create new”. You can still adjust them below.</p>`);
    }
    document.getElementById('backBtn').addEventListener('click', onBack);
  }

  function emptyState(message) {
    return `<div class="text-center text-gray-500 bg-gray-50 border border-gray-200 rounded-lg py-12 px-4">${esc(message)}</div>`;
  }

  // --------------------------------------------------- selection + bulk bar

  // A left-aligned per-row selection checkbox.
  function rowCheckbox(key, label, isSel) {
    return `<input type="checkbox" class="js-row-select h-5 w-5 rounded border-gray-300 accent-blue-500 cursor-pointer flex-shrink-0"
                   data-key="${esc(key)}" ${isSel ? 'checked' : ''} aria-label="Select ${esc(label)}">`;
  }

  // The "select all" master checkbox bar shown above a step's rows.
  function selectionHeader({ count, total, noun, nounPlural }) {
    const allSelected = total > 0 && count === total;
    const totalLabel = `${total} ${total === 1 ? noun : (nounPlural || noun + 's')}`;
    return `
      <div class="flex items-center gap-2.5 rounded-xl border border-gray-200 bg-gray-50/70 px-4 py-3 mb-4">
        <input type="checkbox" id="masterSelect" class="h-5 w-5 rounded border-gray-300 accent-blue-500 cursor-pointer" ${allSelected ? 'checked' : ''}>
        <label for="masterSelect" class="text-sm font-medium text-gray-700 cursor-pointer select-none">Select all</label>
        <span class="text-xs font-medium ${count ? 'text-blue-500' : 'text-gray-400'}">
          ${count ? `${count} selected` : totalLabel}
        </span>
      </div>
    `;
  }

  // Wire the per-row checkboxes and the master "select all" within `scope`.
  // `rerender` rebuilds the step body so the bulk bar/highlighting stays in sync.
  function wireSelection(scope, allKeys, selected, rerender) {
    scope.querySelectorAll('.js-row-select').forEach(cb => {
      cb.addEventListener('change', () => {
        if (cb.checked) selected.add(cb.dataset.key);
        else selected.delete(cb.dataset.key);
        rerender();
      });
    });
    const master = scope.querySelector('#masterSelect');
    if (master) {
      master.indeterminate = selected.size > 0 && selected.size < allKeys.length;
      master.addEventListener('change', () => {
        selected.clear();
        if (master.checked) allKeys.forEach(k => selected.add(k));
        rerender();
      });
    }
  }

  function hideBulkBar() {
    $bulkBar.classList.add('opacity-0', 'translate-y-3', 'pointer-events-none');
    $bulkBar.classList.remove('opacity-100', 'translate-y-0');
    $bulkBar.innerHTML = '';
  }

  // The floating action bar (mirrors the /review page): shown when rows are
  // selected, with one button per bulk action that applies to the selection.
  function renderBulkBar({ count, actions, onApply, onClear, showSetTo = true }) {
    if (!count) { hideBulkBar(); return; }

    const btns = actions.map((a, i) =>
      `<button type="button" data-bulk-idx="${i}" class="ui-button" data-type="${a.type || 'secondary'}" data-size="small">${esc(a.label)}</button>`
    ).join('');

    // overflow-x-auto + flex-nowrap keeps every button on one line: if the
    // actions can't fit (e.g. the tags step's three buttons on a narrow phone)
    // the bar scrolls horizontally rather than wrapping onto a second row.
    $bulkBar.innerHTML = `
      <div class="bg-white shadow-2xl rounded-xl border border-gray-200 px-3 py-3 sm:px-5 flex items-center gap-3 sm:gap-4 overflow-x-auto">
        <button type="button" id="bulkClearBtn"
                class="text-sm font-medium px-3 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-50 whitespace-nowrap flex-shrink-0">
          ${count} selected
        </button>
        <div class="h-6 border-l border-gray-300 flex-shrink-0"></div>
        ${showSetTo ? `<span class="text-sm text-gray-600 whitespace-nowrap flex-shrink-0 hidden sm:inline">Set to</span>` : ''}
        <div class="flex items-center gap-2 flex-nowrap justify-end flex-shrink-0">${btns}</div>
      </div>
    `;

    renderButtons();
    $bulkBar.querySelector('#bulkClearBtn').addEventListener('click', onClear);
    $bulkBar.querySelectorAll('[data-bulk-idx]').forEach(btn => {
      btn.addEventListener('click', () => {
        const action = actions[Number(btn.dataset.bulkIdx)];
        // Actions with an `onClick` (e.g. "pick a specific category") drive their
        // own flow — a popup — instead of applying a fixed value to the selection.
        if (action.onClick) action.onClick();
        else onApply(action.value);
      });
    });

    $bulkBar.classList.remove('opacity-0', 'translate-y-3', 'pointer-events-none');
    $bulkBar.classList.add('opacity-100', 'translate-y-0');
  }

  // A mapping row: selection checkbox + label/count, with a premium dropdown.
  function mappingRow(value, count, dropdownConfig, isSel) {
    return `
      <div class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 bg-white border border-gray-200 rounded-lg p-3">
        <div class="flex items-center gap-3 flex-1 min-w-0">
          ${rowCheckbox(value, value, isSel)}
          <div class="min-w-0">
            <div class="font-medium text-gray-900 truncate">${esc(value)}</div>
            <div class="text-xs text-gray-500">${count} transaction${count !== 1 ? 's' : ''}</div>
          </div>
        </div>
        <div class="sm:w-80 flex-shrink-0">
          ${renderDropdown(dropdownConfig)}
        </div>
      </div>
    `;
  }

  // ---- Step 1: accounts ----

  function renderAccounts() {
    setHeader('Map your accounts', 'Import each account into an existing Monarch account, or create a new one.');

    // Seed defaults: loosely match each YNAB account to an existing Monarch
    // account by name (ignoring emojis/numbers/punctuation, tolerant of minor
    // differences). Below the confidence threshold we default to "create new".
    // When two YNAB accounts best-match the same Monarch account, they both seed
    // to that id and the duplicate warning below kicks in.
    const candidates = monarchAccounts.map(a => ({ id: a.id, name: a.displayName }));
    includedEntries.forEach(([accountName, account]) => {
      if (!accountSelections.has(accountName)) {
        const match = bestNameMatch(account.name || accountName, candidates);
        accountSelections.set(accountName, match ? match.id : ACCOUNT_CREATE_NEW);
      }
    });

    if (includedEntries.length === 0) {
      $content.innerHTML = emptyState('No accounts selected to migrate.');
      setNav('Continue');
      return;
    }

    const actions = [{ value: ACCOUNT_CREATE_NEW, label: 'Create as a new account' }];
    // Mapping several accounts onto one existing Monarch account would create
    // duplicates, so the only safe bulk choice here is "create new".
    const bulkActions = [{ value: ACCOUNT_CREATE_NEW, label: 'Create as new', type: 'secondary' }];
    const selected = new Set();

    // Rows are shown alphabetically by their displayed name so a long account
    // list is easy to scan. The underlying selections are keyed by name, so
    // display order is purely cosmetic here.
    const sortedEntries = [...includedEntries].sort(([aName, a], [bName, b]) =>
      (a.modifiedName || aName).localeCompare(b.modifiedName || bName));
    const allKeys = sortedEntries.map(([accountName]) => accountName);

    renderBody();
    setNav('Continue');
    updateAccountsValidity();

    // Builds the grouped option list for a single account's dropdown, split into
    // three sections so the likely target is reachable without scrolling:
    //   1. Suggested matches — high name-similarity to this YNAB account
    //   2. Other accounts — everything else still free to pick
    //   3. Already mapped — accounts another row already claimed (kept last so
    //      reusing one, which creates a duplicate, takes deliberate effort)
    // Each section is sorted alphabetically.
    function accountGroupsFor(accountName, account) {
      if (!monarchAccounts.length) return [];

      const selectedByOthers = new Set();
      includedEntries.forEach(([otherName]) => {
        if (otherName === accountName) return;
        const t = accountSelections.get(otherName);
        if (t && t !== ACCOUNT_CREATE_NEW) selectedByOthers.add(t);
      });

      const query = account.name || accountName;
      const suggested = [];
      const remaining = [];
      const alreadyMapped = [];

      monarchAccounts.forEach(a => {
        const option = { value: a.id, label: a.displayName };
        if (selectedByOthers.has(a.id)) alreadyMapped.push(option);
        else if (nameMatchScore(query, a.displayName) >= SUGGEST_THRESHOLD) suggested.push(option);
        else remaining.push(option);
      });

      const byLabel = (x, y) => x.label.localeCompare(y.label);
      suggested.sort(byLabel);
      remaining.sort(byLabel);
      alreadyMapped.sort(byLabel);

      const groups = [];
      if (suggested.length) groups.push({ label: 'Suggested matches', options: suggested });
      if (remaining.length) {
        groups.push({ label: suggested.length ? 'Other accounts' : 'Your Monarch accounts', options: remaining });
      }
      if (alreadyMapped.length) groups.push({ label: 'Already mapped', options: alreadyMapped });
      return groups;
    }

    function renderBody() {
      // Monarch account ids picked by more than one CSV account (multiple
      // "create new" is fine, so those are excluded).
      const dupIds = duplicateAccountTargets();

      $content.innerHTML = `
        ${accountsError ? `<div class="rounded-lg bg-amber-50 border border-amber-100 p-3 text-sm text-amber-800 mb-4">Couldn't load your existing Monarch accounts, so new accounts will be created. You can retry by going back and re-entering the mapping.</div>` : ''}
        ${dupIds.size ? `<div class="rounded-lg bg-amber-50 border border-amber-200 p-3 text-sm text-amber-800 mb-4 flex items-start gap-2">
          <span class="leading-none">⚠️</span>
          <span>Each Monarch account should be used once. Resolve the highlighted duplicate${dupIds.size !== 1 ? 's' : ''} below to continue.</span>
        </div>` : ''}
        ${selectionHeader({ count: selected.size, total: sortedEntries.length, noun: 'account' })}
        <div class="space-y-2">
          ${sortedEntries.map(([accountName, account]) => {
            const txCount = (account.transactions || []).length;
            const label = account.modifiedName || accountName;
            const target = accountSelections.get(accountName);
            const isDup = target && target !== ACCOUNT_CREATE_NEW && dupIds.has(target);
            const cardClass = isDup
              ? 'bg-amber-50 border border-amber-300 ring-1 ring-amber-200'
              : 'bg-white border border-gray-200';
            return `
              <div class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 ${cardClass} rounded-lg p-3">
                <div class="flex items-center gap-3 flex-1 min-w-0">
                  ${rowCheckbox(accountName, label, selected.has(accountName))}
                  <div class="min-w-0">
                    <div class="font-medium text-gray-900 truncate">${esc(label)}</div>
                    <div class="text-xs ${isDup ? 'text-amber-700 font-medium' : 'text-gray-500'}">
                      ${txCount} transaction${txCount !== 1 ? 's' : ''}
                    </div>
                  </div>
                </div>
                <div class="sm:w-80 flex-shrink-0">
                  ${renderDropdown({
                    key: accountName,
                    value: target,
                    groups: accountGroupsFor(accountName, account),
                    actions,
                  })}
                </div>
              </div>
            `;
          }).join('')}
        </div>
      `;

      wireSelection($content, allKeys, selected, renderBody);

      initDropdowns($content, (key, value) => {
        accountSelections.set(key, value);
        renderBody();             // re-render to refresh duplicate highlighting
        updateAccountsValidity(); // gate Continue on the new state
      });

      renderBulkBar({
        count: selected.size,
        actions: bulkActions,
        onApply: (value) => {
          selected.forEach(name => accountSelections.set(name, value));
          renderBody();
          updateAccountsValidity();
        },
        onClear: () => { selected.clear(); renderBody(); },
      });
    }
  }

  // Set of Monarch account ids selected by more than one CSV account.
  function duplicateAccountTargets() {
    const counts = new Map();
    includedEntries.forEach(([accountName]) => {
      const target = accountSelections.get(accountName);
      if (target && target !== ACCOUNT_CREATE_NEW) {
        counts.set(target, (counts.get(target) || 0) + 1);
      }
    });
    return new Set([...counts.entries()].filter(([, c]) => c > 1).map(([id]) => id));
  }

  function updateAccountsValidity() {
    const btn = document.getElementById('continueBtn');
    if (btn) {
      btn.disabled = duplicateAccountTargets().size > 0;
      renderButtons();
    }
  }

  // ---- Step 2: customize new accounts ----

  // Only accounts being created new in Monarch need a name + type/subtype —
  // accounts mapped onto an existing account ignore those fields.
  function renderCustomize() {
    const newEntries = includedEntries.filter(([accountName]) => {
      const target = accountSelections.get(accountName);
      return !target || target === ACCOUNT_CREATE_NEW;
    });

    if (newEntries.length === 0) {
      setHeader('New account details', 'Nothing to set up here.');
      $content.innerHTML = `
        <div class="rounded-lg bg-green-50 border border-green-100 p-4 flex items-start gap-3">
          <span class="text-2xl leading-none">✅</span>
          <div>
            <div class="font-semibold text-green-800">No new accounts to set up</div>
            <div class="text-sm text-green-700">Every selected account is importing into an existing Monarch account, so there's nothing to name or type here.</div>
          </div>
        </div>
      `;
      setNav('Continue');
      return;
    }

    setHeader('Set up your new accounts', 'Name each account being created in Monarch and choose its type and subtype.');
    renderAccountSettingsEditor($content, {
      accounts: newEntries.map(([, account]) => account),
      allowTypeSubtype: true,
      cardHover: false,
      onChange: persistState,
    });
    setNav('Continue');
  }

  // ---- Step 3: priority ----

  function renderPriority() {
    // Prioritization only matters per account that's importing into an existing
    // Monarch account. Accounts being created new start empty — nothing to
    // reconcile — so they're excluded here.
    const existingEntries = includedEntries.filter(([accountName]) => {
      const target = accountSelections.get(accountName);
      return target && target !== ACCOUNT_CREATE_NEW;
    });

    if (existingEntries.length === 0) {
      setHeader('Import priority', 'Nothing to reconcile for this import.');
      $content.innerHTML = `
        <div class="rounded-lg bg-green-50 border border-green-100 p-4 flex items-start gap-3">
          <span class="text-2xl leading-none">✅</span>
          <div>
            <div class="font-semibold text-green-800">No action required</div>
            <div class="text-sm text-green-700">All selected accounts are being created new and start empty, so there are no overlapping transactions to prioritize.</div>
          </div>
        </div>
      `;
      setNav('Continue');
      return;
    }

    // Seed defaults for each existing-mapped account.
    existingEntries.forEach(([accountName]) => {
      if (!prioritySelections.has(accountName)) {
        prioritySelections.set(accountName, IMPORT_PRIORITY_DEFAULT);
      }
    });

    const monarchNameById = new Map(monarchAccounts.map(a => [a.id, a.displayName]));
    const options = IMPORT_PRIORITIES.map(p => ({ value: p.value, label: p.title }));
    const bulkActions = IMPORT_PRIORITIES.map(p => ({ value: p.value, label: p.title, type: 'secondary' }));
    const allKeys = existingEntries.map(([name]) => name);
    const selected = new Set(); // accountNames selected for bulk apply (persists across renderBody calls)

    setHeader('Choose import priority', 'For each account importing into an existing Monarch account, choose how overlapping transactions are handled.');

    // The per-option explanations live in a popup, opened from a text button in
    // the header, so the page itself stays clean.
    const infoBtn = document.createElement('button');
    infoBtn.type = 'button';
    infoBtn.className = 'inline-flex items-center gap-1.5 text-sm font-semibold text-blue-500 hover:underline mt-2';
    infoBtn.innerHTML = `
      <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      How does import priority work?
    `;
    infoBtn.addEventListener('click', openPriorityInfoModal);
    // Sits centered under the subtitle, inside the shared header's text block.
    document.getElementById('mappingSubtitle')?.parentElement?.appendChild(infoBtn);

    $content.innerHTML = `<div id="priorityBody"></div>`;
    const $body = $content.querySelector('#priorityBody');
    renderBody();
    setNav('Continue');

    function openPriorityInfoModal() {
      const overlay = document.createElement('div');
      overlay.className = 'fixed inset-0 bg-black/40 flex items-center justify-center z-50 opacity-0 transition-opacity duration-200 p-4';
      overlay.innerHTML = `
        <div class="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
          <div class="flex items-start justify-between gap-4 p-5 sm:p-6 border-b border-gray-100">
            <div class="min-w-0">
              <h2 class="text-lg sm:text-xl font-bold text-gray-900">How import priority works</h2>
              <p class="text-sm text-gray-500 mt-1">When your CSV overlaps transactions already in a Monarch account, this decides which version wins.</p>
            </div>
            <button class="js-close flex-shrink-0 text-gray-400 hover:text-gray-600 rounded-lg p-1 -mr-1 -mt-1" aria-label="Close">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div class="p-5 sm:p-6 space-y-3">
            ${IMPORT_PRIORITIES.map((p, i) => `
              <div class="flex items-start gap-3.5 rounded-xl border border-gray-200 p-4">
                <span class="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center text-sm font-bold">${i + 1}</span>
                <div class="min-w-0">
                  <div class="font-semibold text-gray-900">${esc(p.title)}</div>
                  <div class="text-sm text-gray-600 mt-1 leading-relaxed">${esc(p.description)}</div>
                </div>
              </div>
            `).join('')}
          </div>
          <div class="flex justify-end p-5 sm:p-6 border-t border-gray-100">
            <button class="js-got-it ui-button" data-type="primary">Got it</button>
          </div>
        </div>
      `;
      document.body.appendChild(overlay);
      requestAnimationFrame(() => overlay.classList.add('opacity-100'));

      function close() {
        overlay.classList.remove('opacity-100');
        overlay.classList.add('opacity-0');
        setTimeout(() => overlay.remove(), 200);
      }

      // Wire listeners BEFORE renderButtons(), which rewrites className and would
      // strip the js-got-it marker class off the button.
      const gotIt = overlay.querySelector('.js-got-it');
      overlay.querySelector('.js-close').addEventListener('click', close);
      gotIt.addEventListener('click', close);
      overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
      overlay.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });

      renderButtons();
      gotIt.focus();
    }

    function renderBody() {
      $body.innerHTML = `
        ${selectionHeader({ count: selected.size, total: existingEntries.length, noun: 'account' })}
        <div class="space-y-2.5">
          ${existingEntries.map(([accountName, account]) => {
            const targetName = monarchNameById.get(accountSelections.get(accountName)) || 'existing account';
            const label = account.modifiedName || accountName;
            const isSel = selected.has(accountName);
            const cardClass = isSel
              ? 'border-blue-500/40 bg-blue-500/5 ring-1 ring-blue-500/15'
              : 'border-gray-200 bg-white';
            return `
              <div class="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 rounded-xl border p-3 sm:p-4 transition-colors ${cardClass}">
                <div class="flex items-center gap-3 flex-1 min-w-0">
                  ${rowCheckbox(accountName, label, isSel)}
                  <div class="min-w-0">
                    <div class="font-semibold text-gray-900 truncate">${esc(label)}</div>
                    <div class="text-xs text-gray-500 truncate">→ ${esc(targetName)}</div>
                  </div>
                </div>
                <div class="w-full sm:w-72 flex-shrink-0">
                  ${renderDropdown({
                    key: accountName,
                    value: prioritySelections.get(accountName),
                    groups: [{ options }],
                  })}
                </div>
              </div>
            `;
          }).join('')}
        </div>
      `;

      wireSelection($body, allKeys, selected, renderBody);

      initDropdowns($body, (key, value) => {
        prioritySelections.set(key, value);
      });

      renderBulkBar({
        count: selected.size,
        actions: bulkActions,
        onApply: (value) => {
          selected.forEach(name => prioritySelections.set(name, value));
          renderBody();
        },
        onClear: () => { selected.clear(); renderBody(); },
      });
    }
  }

  // ---- Steps 4 & 5: categories / tags ----

  function categoryGroupsConfig() {
    return categoryGroups
      .filter(g => g.categories.length > 0)
      .map(g => ({
        label: g.name,
        options: g.categories.map(c => ({ value: c.name, label: c.name, icon: c.icon })),
      }));
  }

  function categoryActions() {
    return [
      { value: CATEGORY_NEW, label: 'Add as a new expense category' },
      { value: CATEGORY_NEW_INCOME, label: 'Add as a new income category' },
    ];
  }

  function tagGroupsConfig() {
    return [{
      options: tags.map(t => ({ value: t.name, label: t.name, swatch: t.color })),
    }];
  }

  function tagActions() {
    return [
      { value: TAG_NEW, label: 'Add as a new tag' },
      { value: TAG_IGNORE, label: 'Ignore this tag' },
    ];
  }

  function renderCategories() {
    setHeader('Map your categories', 'Choose how each YNAB category should appear in Monarch. We’ve pre-selected the closest match.');
    const field = txFieldFor('category');
    const counts = field ? collectValueCounts(includedAccounts, field) : [];

    counts.forEach(({ value }) => {
      if (!categorySelections.has(value)) {
        categorySelections.set(value, defaultCategoryValue(value, existingCatByName, uncategorizedName));
      }
    });

    if (counts.length === 0) {
      $content.innerHTML = emptyState(field
        ? 'No categories found in that column. Nothing to map here.'
        : 'No category column selected, so category mapping is skipped.');
      setNav('Continue');
      return;
    }

    const groups = categoryGroupsConfig();
    const actions = categoryActions();
    const allKeys = counts.map(({ value }) => value);
    const selected = new Set();
    const bulkActions = [
      {
        label: 'Set category', type: 'secondary',
        onClick: () => openOptionPicker({
          title: 'Choose a category',
          subtitle: `Apply to ${selected.size} selected ${selected.size === 1 ? 'category' : 'categories'}`,
          groups,
          // The same "add as new expense/income category" choices the per-row
          // dropdown offers, pinned to the popup footer below the search list.
          actions,
          searchPlaceholder: 'Search categories…',
          onSelect: (value) => {
            selected.forEach(v => categorySelections.set(v, value));
            renderBody();
          },
        }),
      },
    ];

    renderBody();
    setNav('Continue');

    function renderBody() {
      $content.innerHTML = `
        ${selectionHeader({ count: selected.size, total: counts.length, noun: 'category', nounPlural: 'categories' })}
        <div class="space-y-2">
          ${counts.map(({ value, count }) => mappingRow(value, count, {
            key: value,
            value: categorySelections.get(value),
            groups,
            actions,
          }, selected.has(value))).join('')}
        </div>
      `;
      wireSelection($content, allKeys, selected, renderBody);
      initDropdowns($content, (key, value) => categorySelections.set(key, value));
      renderBulkBar({
        count: selected.size,
        actions: bulkActions,
        showSetTo: false,
        onApply: (value) => {
          selected.forEach(v => categorySelections.set(v, value));
          renderBody();
        },
        onClear: () => { selected.clear(); renderBody(); },
      });
    }
  }

  function renderTags() {
    setHeader('Map your tags', 'YNAB flags become Monarch tags. Choose how each should be handled.');
    const field = txFieldFor('tags');
    const counts = field ? collectValueCounts(includedAccounts, field) : [];

    counts.forEach(({ value }) => {
      if (!tagSelections.has(value)) {
        tagSelections.set(value, defaultTagValue(value, existingTagByName));
      }
    });

    if (counts.length === 0) {
      $content.innerHTML = emptyState(field
        ? 'No tags found in that column. Nothing to map here.'
        : 'No tags column selected, so tag mapping is skipped.');
      setNav('Start import');
      return;
    }

    const groups = tagGroupsConfig();
    const actions = tagActions();
    const allKeys = counts.map(({ value }) => value);
    const selected = new Set();
    const bulkActions = [
      {
        label: 'Set tag', type: 'secondary',
        onClick: () => openOptionPicker({
          title: 'Choose a tag',
          subtitle: `Apply to ${selected.size} selected ${selected.size === 1 ? 'tag' : 'tags'}`,
          groups,
          searchPlaceholder: 'Search tags…',
          onSelect: (value) => {
            selected.forEach(v => tagSelections.set(v, value));
            renderBody();
          },
        }),
      },
      { value: TAG_NEW, label: 'New tag', type: 'secondary' },
      { value: TAG_IGNORE, label: 'Ignore this tag', type: 'secondary' },
    ];

    renderBody();
    setNav('Start import');

    function renderBody() {
      $content.innerHTML = `
        ${selectionHeader({ count: selected.size, total: counts.length, noun: 'tag' })}
        <div class="space-y-2">
          ${counts.map(({ value, count }) => mappingRow(value, count, {
            key: value,
            value: tagSelections.get(value),
            groups,
            actions,
          }, selected.has(value))).join('')}
        </div>
      `;
      wireSelection($content, allKeys, selected, renderBody);
      initDropdowns($content, (key, value) => tagSelections.set(key, value));
      renderBulkBar({
        count: selected.size,
        actions: bulkActions,
        onApply: (value) => {
          selected.forEach(v => tagSelections.set(v, value));
          renderBody();
        },
        onClear: () => { selected.clear(); renderBody(); },
      });
    }
  }

  // ----------------------------------------------------------------- nav

  function setNav(nextText) {
    $nav.innerHTML = createNavigationBar({ showBack: false, showNext: true, nextText });
    renderButtons();
    document.getElementById('continueBtn').addEventListener('click', onNext);
  }

  function onBack() {
    if (stepIndex > 0) {
      stepIndex--;
      render();
    } else {
      goBack();
    }
  }

  function onNext() {
    if (stepIndex < STEPS.length - 1) {
      stepIndex++;
      render();
      // Each step renders in place; reset scroll so the next step starts at the
      // top instead of inheriting the previous step's scroll offset.
      window.scrollTo(0, 0);
    } else {
      commitAndContinue();
    }
  }

  function commitAndContinue() {
    const columnMapping = {};
    columnSelections.forEach((idx, key) => {
      if (typeof idx === 'number') columnMapping[key] = idx;
    });

    const categoryMapping = Object.fromEntries(categorySelections);
    const catField = txFieldFor('category');
    if (catField && hasBlankValues(includedAccounts, catField) && categoryMapping.uncategorized === undefined) {
      // Monarch normalizes blank category cells to "uncategorized".
      categoryMapping.uncategorized = uncategorizedName;
    }

    // Per-account import priority, only for accounts mapped to an existing
    // Monarch account (new accounts have nothing to reconcile).
    const priorityMapping = {};
    includedEntries.forEach(([accountName]) => {
      const target = accountSelections.get(accountName);
      if (target && target !== ACCOUNT_CREATE_NEW) {
        priorityMapping[accountName] = prioritySelections.get(accountName) || IMPORT_PRIORITY_DEFAULT;
      }
    });

    state.mappings = {
      accountMapping: Object.fromEntries(accountSelections),
      columnMapping,
      categoryMapping,
      tagMapping: Object.fromEntries(tagSelections),
      priorityMapping,
    };
    persistState();
    navigate('/complete');
  }
}
