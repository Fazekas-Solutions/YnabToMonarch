/**
 * Account settings editor — a reusable list for renaming accounts and (optionally)
 * setting their Monarch type/subtype, used in two places:
 *
 *   - the manual download flow (`/customize`), with `allowTypeSubtype: false`
 *     (renames only — type/subtype don't affect the CSV), and
 *   - the mapping wizard's "New accounts" step, with `allowTypeSubtype: true`
 *     (only the accounts being created new in Monarch).
 *
 * Accounts can be selected (checkbox + select-all) so bulk rename / bulk type
 * apply to just the chosen subset. It mutates the passed account objects in place
 * (`modifiedName`, `type`, `subtype`) and calls `onChange` after every edit so
 * callers can persist state.
 *
 * Usage:
 *   renderAccountSettingsEditor(container, { accounts, allowTypeSubtype, onChange });
 */

import { getAccountTypeByName } from '../utils/accountTypeUtils.js';
import monarchAccountTypes from '../../public/static-data/monarchAccountTypes.json';
import { currencyFormatter } from '../utils/format.js';
import { renderButtons } from './button.js';
import { renderDropdown, initDropdowns } from './dropdown.js';

function esc(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

const PENCIL_PATH = 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z';

function typeOptions() {
  return monarchAccountTypes.data.map(t => ({ value: t.typeName, label: t.typeDisplay }));
}

function subtypeOptions(typeName) {
  const type = getAccountTypeByName(typeName);
  return (type?.subtypes || []).map(s => ({ value: s.name, label: s.display }));
}

export function renderAccountSettingsEditor($container, { accounts, allowTypeSubtype = false, cardHover = true, onChange = () => {} }) {
  const selected = new Set();

  const selectedAccounts = () => accounts.filter(a => selected.has(a.id));

  // One-time scaffold. The toolbar + list re-render in place on every change;
  // the floating bulk bar persists (so it can fade in/out) and lives inside
  // $container so it's torn down automatically when the view is replaced.
  $container.innerHTML = `
    <div id="aseToolbar"></div>
    <div id="aseList" class="space-y-2.5"></div>
    <div id="aseBulkBar"
         class="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 translate-y-3 opacity-0 pointer-events-none transition-all duration-300 w-[calc(100vw-1.5rem)] sm:w-auto sm:max-w-2xl"></div>
  `;
  const $toolbar = $container.querySelector('#aseToolbar');
  const $list = $container.querySelector('#aseList');
  const $bar = $container.querySelector('#aseBulkBar');

  function render() {
    $toolbar.innerHTML = renderToolbar();
    $list.innerHTML = accounts.map(renderCard).join('');
    wire();
    renderBulkBar();
  }

  // "Select all" master checkbox + count. Bulk actions live in the floating bar.
  function renderToolbar() {
    const count = selected.size;
    const allSelected = count === accounts.length && count > 0;
    return `
      <div class="flex items-center gap-2.5 rounded-xl border border-gray-200 bg-gray-50/70 px-4 py-3 mb-4">
        <input type="checkbox" id="selectAll"
               class="h-5 w-5 rounded border-gray-300 accent-blue-500 cursor-pointer"
               ${allSelected ? 'checked' : ''}>
        <label for="selectAll" class="text-sm font-medium text-gray-700 cursor-pointer select-none">Select all</label>
        <span class="text-xs font-medium ${count ? 'text-blue-500' : 'text-gray-400'}">
          ${count ? `${count} selected` : `${accounts.length} account${accounts.length !== 1 ? 's' : ''}`}
        </span>
      </div>
    `;
  }

  // Floating action bar: shown while accounts are selected, holding the bulk
  // Rename / Set type actions (mirrors the mapping wizard's other steps).
  function renderBulkBar() {
    const count = selected.size;
    if (!count) {
      $bar.classList.add('opacity-0', 'translate-y-3', 'pointer-events-none');
      $bar.classList.remove('opacity-100', 'translate-y-0');
      $bar.innerHTML = '';
      return;
    }

    const setTypeBtn = allowTypeSubtype
      ? `<button type="button" id="bulkType" class="ui-button" data-type="secondary" data-size="small">Set type</button>`
      : '';

    $bar.innerHTML = `
      <div class="bg-white shadow-2xl rounded-xl border border-gray-200 px-3 py-3 sm:px-5 flex items-center gap-3 sm:gap-4">
        <button type="button" id="bulkClear"
                class="text-sm font-medium px-3 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-50 whitespace-nowrap flex-shrink-0">
          ${count} selected
        </button>
        <div class="h-6 border-l border-gray-300 flex-shrink-0"></div>
        <div class="flex items-center gap-2 flex-wrap justify-end">
          <button type="button" id="bulkRename" class="ui-button" data-type="secondary" data-size="small">Rename</button>
          ${setTypeBtn}
        </div>
      </div>
    `;

    renderButtons();
    $bar.querySelector('#bulkClear').addEventListener('click', () => { selected.clear(); render(); });
    $bar.querySelector('#bulkRename').addEventListener('click', () =>
      openBulkRenameModal(selectedAccounts(), () => { onChange(); render(); }));
    const typeBtn = $bar.querySelector('#bulkType');
    if (typeBtn) {
      typeBtn.addEventListener('click', () =>
        openBulkTypeModal(selectedAccounts(), () => { onChange(); render(); }));
    }

    $bar.classList.remove('opacity-0', 'translate-y-3', 'pointer-events-none');
    $bar.classList.add('opacity-100', 'translate-y-0');
  }

  function renderCard(account) {
    const name = account.modifiedName || account.name || 'Account';
    const count = (account.transactions || []).length;
    const isSel = selected.has(account.id);
    const balance = typeof account.balance === 'number' ? ` · ${esc(currencyFormatter.format(account.balance))}` : '';

    const typeControls = allowTypeSubtype ? `
      <div class="flex flex-col sm:flex-row gap-2 sm:items-center flex-shrink-0 w-full sm:w-auto">
        <div class="w-full sm:w-40">
          ${renderDropdown({ key: `type:${account.id}`, value: account.type, placeholder: 'Type', groups: [{ options: typeOptions() }] })}
        </div>
        <div class="w-full sm:w-40">
          ${renderDropdown({ key: `subtype:${account.id}`, value: account.subtype || '', placeholder: 'Subtype', groups: [{ options: subtypeOptions(account.type) }] })}
        </div>
      </div>
    ` : '';

    return `
      <div class="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 rounded-xl border p-3 sm:p-4 transition-colors ${isSel ? 'border-blue-500/40 bg-blue-500/5 ring-1 ring-blue-500/15' : `border-gray-200 bg-white${cardHover ? ' hover:border-gray-300' : ''}`}">
        <div class="flex items-center gap-3 flex-1 min-w-0">
          <input type="checkbox" class="js-select h-5 w-5 rounded border-gray-300 accent-blue-500 cursor-pointer flex-shrink-0"
                 data-id="${esc(account.id)}" ${isSel ? 'checked' : ''} aria-label="Select ${esc(name)}">
          <div class="min-w-0">
            <button type="button" class="js-name-edit group inline-flex items-center gap-1.5 max-w-full min-w-0 text-left"
                    data-id="${esc(account.id)}" title="Click to rename '${esc(name)}'">
              <span class="js-name-text truncate font-semibold text-gray-900 border-b border-dashed border-gray-300 group-hover:border-blue-500 group-hover:text-blue-500 transition-colors duration-150">${esc(name)}</span>
              <svg class="w-3.5 h-3.5 flex-shrink-0 text-gray-400 opacity-60 group-hover:opacity-100 group-hover:text-blue-500 transition-all duration-150" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="${PENCIL_PATH}" /></svg>
            </button>
            <div class="text-xs text-gray-500 mt-0.5">${count} transaction${count !== 1 ? 's' : ''}${balance}</div>
          </div>
        </div>
        ${typeControls}
      </div>
    `;
  }

  function wire() {
    // Per-account selection.
    $container.querySelectorAll('.js-select').forEach(cb => {
      cb.addEventListener('change', () => {
        if (cb.checked) selected.add(cb.dataset.id);
        else selected.delete(cb.dataset.id);
        render();
      });
    });

    const selectAll = $container.querySelector('#selectAll');
    if (selectAll) {
      const count = selected.size;
      selectAll.indeterminate = count > 0 && count < accounts.length;
      selectAll.addEventListener('change', () => {
        selected.clear();
        if (selectAll.checked) accounts.forEach(a => selected.add(a.id));
        render();
      });
    }

    // Per-account name editing.
    $container.querySelectorAll('.js-name-edit').forEach(btn => {
      btn.addEventListener('click', () => {
        const account = accounts.find(a => String(a.id) === btn.dataset.id);
        if (account) openNameEditor(account, () => { onChange(); render(); });
      });
    });

    // Per-account type/subtype dropdowns.
    initDropdowns($container, (key, value) => {
      const [kind, id] = [key.slice(0, key.indexOf(':')), key.slice(key.indexOf(':') + 1)];
      const account = accounts.find(a => String(a.id) === id);
      if (!account) return;
      if (kind === 'type') {
        account.type = value;
        account.subtype = subtypeOptions(value)[0]?.value || null;
        onChange();
        render(); // refresh this row's subtype options
      } else if (kind === 'subtype') {
        account.subtype = value || null;
        onChange();
      }
    });
  }

  render();
}

// --------------------------------------------------------------- modal helpers

// Centered modal shell with fade-in, backdrop-click + Escape to close. Returns
// { overlay, box, close }. Listeners are attached by callers BEFORE renderButtons.
function createModal(innerHtml, { maxWidth = 'max-w-md', scroll = true } = {}) {
  const overlay = document.createElement('div');
  overlay.className = 'fixed inset-0 bg-black/40 flex items-center justify-center z-50 opacity-0 transition-opacity duration-200 p-4';
  // `scroll: false` keeps the box overflow-visible so dropdown panels inside it
  // (the bulk type/subtype pickers) aren't clipped.
  const boxOverflow = scroll ? 'max-h-[90vh] overflow-y-auto' : '';
  overlay.innerHTML = `<div class="bg-white rounded-xl shadow-xl w-full ${maxWidth} p-5 sm:p-6 ${boxOverflow}">${innerHtml}</div>`;
  document.body.appendChild(overlay);
  requestAnimationFrame(() => overlay.classList.add('opacity-100'));

  // Lock scrolling on the page behind the modal; restored on close.
  const prevBodyOverflow = document.body.style.overflow;
  document.body.style.overflow = 'hidden';

  function close() {
    document.body.style.overflow = prevBodyOverflow;
    overlay.classList.remove('opacity-100');
    overlay.classList.add('opacity-0');
    setTimeout(() => overlay.remove(), 200);
  }
  overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
  overlay.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });

  return { overlay, box: overlay.firstElementChild, close };
}

function openNameEditor(account, onSaved) {
  const { overlay, close } = createModal(`
    <h2 class="font-bold mb-3 text-lg">Edit account name</h2>
    <input type="text" aria-label="Account name input"
           class="border border-gray-300 rounded-lg w-full px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
    <div class="flex justify-end gap-2">
      <button class="js-cancel ui-button" data-type="secondary">Cancel</button>
      <button class="js-save ui-button" data-type="primary">Save</button>
    </div>
  `);

  const input = overlay.querySelector('input');
  input.value = account.modifiedName || account.name || '';

  function save() {
    const next = input.value.trim();
    if (next) account.modifiedName = next;
    close();
    onSaved();
  }

  // Wire BEFORE renderButtons(), which rewrites className and strips js-* markers.
  overlay.querySelector('.js-cancel').addEventListener('click', close);
  overlay.querySelector('.js-save').addEventListener('click', save);
  overlay.addEventListener('keydown', (e) => { if (e.key === 'Enter') save(); });

  renderButtons();
  input.focus();
  input.select();
}

// ------------------------------------------------------------- bulk rename

function applyPattern(pattern, account, index) {
  const today = new Date().toISOString().split('T')[0];
  const base = account.originalYnabName?.trim() || account.name || 'Account';
  return pattern
    .replace(/{{YNAB}}/g, base)
    .replace(/{{Index}}/g, index)
    .replace(/{{Upper}}/g, base.toUpperCase())
    .replace(/{{Date}}/g, today);
}

function openBulkRenameModal(accounts, onApplied) {
  const { overlay, close } = createModal(`
    <h2 class="text-lg sm:text-xl font-bold mb-1">Rename ${accounts.length} account${accounts.length !== 1 ? 's' : ''}</h2>
    <p class="text-sm text-gray-500 mb-4">Build a name pattern using the tokens below.</p>

    <label for="renamePattern" class="font-medium text-sm">Pattern</label>
    <input id="renamePattern" type="text"
           class="border border-gray-300 rounded-lg w-full px-3 py-2 mt-1 mb-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
           placeholder="e.g. {{YNAB}} - {{Index}}">

    <div class="grid grid-cols-2 gap-2 mb-4">
      <button type="button" class="token-btn bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg text-xs sm:text-sm transition-colors" data-token="{{YNAB}}">YNAB Name</button>
      <button type="button" class="token-btn bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg text-xs sm:text-sm transition-colors" data-token="{{Index}}">Index</button>
      <button type="button" class="token-btn bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg text-xs sm:text-sm transition-colors" data-token="{{Upper}}">Uppercase YNAB</button>
      <button type="button" class="token-btn bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg text-xs sm:text-sm transition-colors" data-token="{{Date}}">Today (YYYY-MM-DD)</button>
    </div>

    <div class="flex items-center gap-3 mb-4">
      <label for="indexStart" class="text-sm">Index start</label>
      <input id="indexStart" type="number" value="1"
             class="border border-gray-300 rounded-lg px-3 py-2 w-24 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
    </div>

    <div class="border border-gray-200 rounded-lg p-3 bg-gray-50 mb-4">
      <div class="font-medium text-sm mb-2">Preview</div>
      <div id="renamePreview" class="text-xs sm:text-sm text-gray-700 space-y-1 max-h-32 overflow-y-auto" aria-live="polite"></div>
    </div>

    <div class="flex justify-end gap-2">
      <button class="js-cancel ui-button" data-type="secondary">Cancel</button>
      <button class="js-apply ui-button" data-type="primary">Apply</button>
    </div>
  `, { maxWidth: 'max-w-lg' });

  const patternInput = overlay.querySelector('#renamePattern');
  const indexStartInput = overlay.querySelector('#indexStart');
  const previewDiv = overlay.querySelector('#renamePreview');

  function updatePreview() {
    previewDiv.innerHTML = '';
    const pattern = patternInput.value;
    const indexStart = parseInt(indexStartInput.value, 10) || 1;
    accounts.slice(0, 3).forEach((acc, i) => {
      const div = document.createElement('div');
      div.textContent = applyPattern(pattern, acc, i + indexStart);
      previewDiv.appendChild(div);
    });
    if (accounts.length > 3) {
      const more = document.createElement('div');
      more.className = 'text-gray-400';
      more.textContent = `+ ${accounts.length - 3} more…`;
      previewDiv.appendChild(more);
    }
  }

  overlay.querySelectorAll('.token-btn').forEach(btn => {
    btn.addEventListener('click', () => { patternInput.value += btn.dataset.token; updatePreview(); });
  });
  patternInput.addEventListener('input', updatePreview);
  indexStartInput.addEventListener('input', updatePreview);
  updatePreview();

  // Wire BEFORE renderButtons(), which rewrites className and strips js-* markers.
  overlay.querySelector('.js-cancel').addEventListener('click', close);
  overlay.querySelector('.js-apply').addEventListener('click', () => {
    const pattern = patternInput.value;
    const indexStart = parseInt(indexStartInput.value, 10) || 1;
    accounts.forEach((acc, i) => { acc.modifiedName = applyPattern(pattern, acc, i + indexStart); });
    close();
    onApplied();
  });

  renderButtons();
  patternInput.focus();
}

// ------------------------------------------------------------- bulk type/subtype

function openBulkTypeModal(accounts, onApplied) {
  // Working selection, defaulting to the most common type among the chosen set.
  let type = accounts[0]?.type || typeOptions()[0]?.value || null;
  let subtype = subtypeOptions(type)[0]?.value || null;

  const { overlay, box, close } = createModal(`
    <h2 class="text-lg sm:text-xl font-bold mb-1">Set type for ${accounts.length} account${accounts.length !== 1 ? 's' : ''}</h2>
    <p class="text-sm text-gray-500 mb-4">Applies the same Monarch type and subtype to every selected account.</p>
    <div class="space-y-3">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Type</label>
        <div id="bulkTypeSlot"></div>
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Subtype</label>
        <div id="bulkSubtypeSlot"></div>
      </div>
    </div>
    <div class="flex justify-end gap-2 mt-6">
      <button class="js-cancel ui-button" data-type="secondary">Cancel</button>
      <button class="js-apply ui-button" data-type="primary">Apply</button>
    </div>
  `, { scroll: false });

  const typeSlot = box.querySelector('#bulkTypeSlot');
  const subtypeSlot = box.querySelector('#bulkSubtypeSlot');

  function renderDropdowns() {
    typeSlot.innerHTML = renderDropdown({ key: 'type', value: type, placeholder: 'Type', groups: [{ options: typeOptions() }] });
    subtypeSlot.innerHTML = renderDropdown({ key: 'subtype', value: subtype || '', placeholder: 'Subtype', groups: [{ options: subtypeOptions(type) }] });
    initDropdowns(box, (key, value) => {
      if (key === 'type') {
        type = value;
        subtype = subtypeOptions(value)[0]?.value || null;
        renderDropdowns();
      } else {
        subtype = value || null;
      }
    });
  }
  renderDropdowns();

  // Wire BEFORE renderButtons(), which rewrites className and strips js-* markers.
  overlay.querySelector('.js-cancel').addEventListener('click', close);
  overlay.querySelector('.js-apply').addEventListener('click', () => {
    accounts.forEach(acc => { acc.type = type; acc.subtype = subtype; });
    close();
    onApplied();
  });

  renderButtons();
}
