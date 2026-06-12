import state from '../../state.js';
import { navigate, persistState, goBack } from '../../router.js';
import { renderButtons } from '../../components/button.js';
import { createNavigationBar, createStepHeader } from '../../utils/navigationBar.js';
import { currencyFormatter } from '../../utils/format.js';
import { toggleDisabled } from '../../utils/dom.js';

let reviewTableBody, mobileAccountList, importBtn, searchInput;
let activeFilters = {
  accountName: '',
  nameMatchType: 'contains',
  nameCaseSensitive: false,
  transactionsMin: null,
  transactionsMax: null,
  balanceMin: null,
  balanceMax: null,
  inclusion: 'all'
};
let searchQuery = '';
// Table sort state (session-only; resets on reload). Null key = original order.
let sortKey = null;
let sortDir = 'asc';

export default function initAccountReviewView() {
  // Redirect to upload if no accounts are available
  if (!state.accounts || Object.keys(state.accounts).length === 0) {
    navigate('/upload', true);
    return;
  }

  // Full-width step header (shared component); Continue stays in the bottom bar.
  document.querySelector('.container-responsive').insertAdjacentHTML('afterbegin', createStepHeader({
    title: "Review accounts",
    subtitle: "We found these accounts in your YNAB export. Pick which to bring over and confirm each Monarch type.",
    backText: "Back to Upload"
  }));
  const navigationConfig = {
    showBack: false,
    showNext: true,
    nextText: "Continue",
    nextId: "continueBtn",
    nextType: "primary"
  };
  document.getElementById('reviewContent').insertAdjacentHTML('beforeend', createNavigationBar(navigationConfig));

  reviewTableBody = document.getElementById('reviewTableBody');
  mobileAccountList = document.getElementById('mobileAccountList');
  importBtn = document.getElementById('continueBtn');
  searchInput = document.getElementById('searchInput');

  renderButtons();
  renderAccountTable(); // Initialize the table/mobile view

  // Initialize filters modal after a brief delay to ensure DOM is ready
  setTimeout(() => {
    initializeFiltersModal();
    // Initial account count display
    const totalAccounts = Object.keys(state.accounts).length;
    updateAccountCountDisplay(totalAccounts, totalAccounts);
  }, 100);

  // Search listener
  const searchClearBtn = document.getElementById('searchClearBtn');
  const toggleSearchClear = () => {
    if (searchClearBtn) searchClearBtn.classList.toggle('hidden', !searchInput.value);
  };
  let debounceTimer;
  searchInput.addEventListener('input', () => {
    toggleSearchClear(); // immediate, not debounced
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      searchQuery = searchInput.value.toLowerCase();
      renderAccountTable();
      persistState();
    }, 200);
  });
  if (searchClearBtn) {
    searchClearBtn.addEventListener('click', () => {
      clearTimeout(debounceTimer);
      searchInput.value = '';
      searchQuery = '';
      toggleSearchClear();
      renderAccountTable();
      persistState();
      searchInput.focus();
    });
  }
  toggleSearchClear(); // reflect any restored search value on load

  // Sortable column headers
  document.querySelectorAll('th[data-sort-key]').forEach(th => {
    th.addEventListener('click', () => {
      const key = th.getAttribute('data-sort-key');
      if (sortKey === key) {
        sortDir = sortDir === 'asc' ? 'desc' : 'asc';
      } else {
        sortKey = key;
        sortDir = 'asc';
      }
      renderAccountTable();
    });
  });

  // Filter modal listeners - use timeout to ensure DOM is ready
  setTimeout(() => {
    const filtersBtn = document.getElementById('filtersBtn');
    if (filtersBtn) {
      console.log('Adding click listener to filters button');
      filtersBtn.addEventListener('click', (e) => {
        console.log('Filters button clicked!');
        e.preventDefault();
        openFiltersModal();
      });
    } else {
      console.error('Filters button not found!');
    }
    
    const filtersModalClose = document.getElementById('filtersModalClose');
    if (filtersModalClose) {
      filtersModalClose.addEventListener('click', closeFiltersModal);
    }
    
    const filtersApply = document.getElementById('filtersApply');
    if (filtersApply) {
      filtersApply.addEventListener('click', applyFilters);
    }
    
    const filtersReset = document.getElementById('filtersReset');
    if (filtersReset) {
      filtersReset.addEventListener('click', resetFilters);
    }
    
    // Close modal when clicking outside
    const filtersModal = document.getElementById('filtersModal');
    if (filtersModal) {
      filtersModal.addEventListener('click', (e) => {
        if (e.target.id === 'filtersModal') {
          closeFiltersModal();
        }
      });
    }
    
    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && filtersModal && !filtersModal.classList.contains('hidden')) {
        closeFiltersModal();
      }
    });
    
    // Quick clear filters button (new clear button)
    const clearFiltersBtn = document.getElementById('clearFiltersBtn');
    if (clearFiltersBtn) {
      clearFiltersBtn.addEventListener('click', () => {
        resetFilters();
        // Close modal if it's open
        closeFiltersModal();
      });
    }
  }, 100);

  // Bulk action bar listeners
  document.getElementById('unselectAllBtnMobile').addEventListener('click', () => updateSelection(false));
  document.getElementById('unselectAllBtnDesktop').addEventListener('click', () => updateSelection(false));
  document.getElementById('bulkIncludeBtnMobile').addEventListener('click', () => updateInclusion(true));
  document.getElementById('bulkIncludeBtnDesktop').addEventListener('click', () => updateInclusion(true));
  document.getElementById('bulkExcludeBtnMobile').addEventListener('click', () => updateInclusion(false));
  document.getElementById('bulkExcludeBtnDesktop').addEventListener('click', () => updateInclusion(false));
  // Master checkbox listener
  document.getElementById('masterCheckbox').addEventListener('change', masterCheckboxChange);
  
  // Mobile master checkbox listener
  const masterCheckboxMobile = document.getElementById('masterCheckboxMobile');
  if (masterCheckboxMobile) {
    masterCheckboxMobile.addEventListener('change', masterCheckboxChange);
  }

  // Mobile sort control (the desktop equivalent is the clickable column headers)
  const mobileSortSelect = document.getElementById('mobileSortSelect');
  if (mobileSortSelect) {
    mobileSortSelect.addEventListener('change', (e) => {
      const value = e.target.value;
      if (value === 'default') {
        sortKey = null;
      } else {
        const [key, dir] = value.split('-');
        sortKey = key;
        sortDir = dir;
      }
      renderAccountTable();
    });
  }

  // Navigation listeners
  document.getElementById('continueBtn').addEventListener('click', () => navigate('/method'));
  document.getElementById('backBtn').addEventListener('click', () => goBack());

  renderAccountTable();
}

function updateSelection(shouldSelect) {
  Object.values(state.accounts).forEach(acc => {
    if (acc.status !== 'processed') acc.selected = shouldSelect;
  });
  persistState();
  renderAccountTable();
}

function updateInclusion(include) {
  Object.values(state.accounts).forEach(acc => {
    if (acc.selected) acc.included = include;
  });
  persistState();
  renderAccountTable();
}

function renderAccountTable() {
  const fragment = document.createDocumentFragment();
  const mobileFragment = document.createDocumentFragment();
  const accounts = Object.values(state.accounts);

  // Clear both desktop and mobile views
  reviewTableBody.innerHTML = '';
  if (mobileAccountList) mobileAccountList.innerHTML = '';

  // Filter (advanced filters + search), then sort.
  const visible = accounts.filter(account =>
    passesFilters(account) &&
    (!searchQuery || account.modifiedName.toLowerCase().includes(searchQuery))
  );
  sortAccounts(visible);
  const visibleCount = visible.length;

  for (const account of visible) {
    fragment.appendChild(createAccountRowElement(account));
    if (mobileAccountList) {
      mobileFragment.appendChild(createMobileAccountCard(account));
    }
  }

  reviewTableBody.appendChild(fragment);
  if (mobileAccountList) {
    mobileAccountList.appendChild(mobileFragment);
  }

  // Empty state when search/filters exclude every account
  if (visibleCount === 0) {
    reviewTableBody.appendChild(createEmptyStateRow());
    if (mobileAccountList) mobileAccountList.appendChild(createEmptyStateCard());
  }

  updateSortIndicators();

  // Update account count indicators
  updateAccountCountDisplay(visibleCount, accounts.length);
  
  updateMasterCheckbox(getVisibleAccounts());
  refreshBulkActionBar();
  updateMobileSelectionCount();
  updateContinueButton();
}

function isIncludedAndUnprocessed(account) {
  return account.included && account.status !== 'processed';
}

// Updates the Continue CTA's label/disabled state from the current inclusion
// counts. Split out of renderAccountTable so a single include/exclude toggle
// can refresh the CTA without rebuilding the whole table.
function updateContinueButton() {
  const includedCount = Object.values(state.accounts).filter(isIncludedAndUnprocessed).length;
  const hasIncluded = includedCount > 0;
  toggleDisabled(importBtn, !hasIncluded);
  importBtn.title = importBtn.disabled ? 'At least one account must be included to proceed' : '';
  importBtn.textContent = hasIncluded
    ? `Continue with ${includedCount} account${includedCount !== 1 ? 's' : ''}`
    : 'Continue';
  renderButtons();
}

// Stable, attribute-selector-safe key so a toggle can find an account's pill(s)
// across both the desktop row and the mobile card.
function accountKey(account) {
  return String(account.id || account.modifiedName).replace(/[^a-zA-Z0-9_-]/g, '_');
}

// Sorts in place by the active column. No-op when no column is selected.
function sortAccounts(list) {
  if (!sortKey) return;
  const dir = sortDir === 'asc' ? 1 : -1;
  list.sort((a, b) => {
    if (sortKey === 'name') {
      return dir * a.modifiedName.localeCompare(b.modifiedName, undefined, { sensitivity: 'base' });
    }
    const av = sortKey === 'balance' ? a.balance : a.transactionCount;
    const bv = sortKey === 'balance' ? b.balance : b.transactionCount;
    return dir * (av - bv);
  });
}

// Reflects the active sort in the desktop header arrows / aria-sort and keeps
// the mobile sort dropdown in sync (both drive the same sortKey/sortDir state).
function updateSortIndicators() {
  document.querySelectorAll('th[data-sort-key]').forEach(th => {
    const key = th.getAttribute('data-sort-key');
    const indicator = th.querySelector('.sort-indicator');
    const isActive = key === sortKey;
    th.setAttribute('aria-sort', isActive ? (sortDir === 'asc' ? 'ascending' : 'descending') : 'none');
    if (!indicator) return;
    indicator.textContent = isActive ? (sortDir === 'asc' ? '↑' : '↓') : '↕';
    indicator.classList.toggle('opacity-0', !isActive);
  });

  const mobileSortSelect = document.getElementById('mobileSortSelect');
  if (mobileSortSelect) {
    mobileSortSelect.value = sortKey ? `${sortKey}-${sortDir}` : 'default';
  }
}

// Quiet, state-based inclusion control shared by desktop rows and mobile cards.
// Included = affirmative green, Excluded = neutral, Processed = muted/disabled.
// Blue is reserved for the page's single primary action (Continue), so the
// per-row state never competes with the main CTA.
function createInclusionToggle(account, { fixedWidth = false } = {}) {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.dataset.accountToggle = accountKey(account);
  if (fixedWidth) btn.dataset.fixedWidth = '1';
  applyInclusionState(btn, account);

  if (account.status !== 'processed') {
    btn.addEventListener('click', () => {
      account.included = !account.included;
      persistState();
      // Toggling inclusion only changes which rows are visible when the
      // inclusion filter is active — otherwise just repaint this account's
      // pill(s) and the CTA instead of rebuilding the whole table.
      if (activeFilters.inclusion !== 'all') {
        renderAccountTable();
        return;
      }
      document.querySelectorAll(`[data-account-toggle="${accountKey(account)}"]`)
        .forEach(el => applyInclusionState(el, account));
      updateContinueButton();
    });
  }
  return btn;
}

// Paints a toggle button to match an account's current inclusion/processed
// state. Pure render — safe to call repeatedly on the same element in place.
function applyInclusionState(btn, account) {
  const isProcessed = account.status === 'processed';
  const base = 'inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-full ' +
    'text-xs font-medium border transition-colors duration-200 ' +
    'focus:outline-none focus:ring-2 focus:ring-offset-1';
  let stateCls;
  if (isProcessed) {
    stateCls = 'bg-gray-100 text-gray-500 border-gray-200 cursor-not-allowed';
  } else if (account.included) {
    stateCls = 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100 focus:ring-green-500';
  } else {
    stateCls = 'bg-white text-gray-500 border-gray-300 hover:bg-gray-50 focus:ring-gray-400';
  }
  btn.className = `${base} ${stateCls}`;
  if (btn.dataset.fixedWidth === '1') btn.classList.add('min-w-[104px]');

  const label = isProcessed ? 'Processed' : (account.included ? 'Included' : 'Excluded');
  const checkIcon = (account.included && !isProcessed)
    ? '<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>'
    : '';
  btn.innerHTML = `${checkIcon}<span>${label}</span>`;

  btn.disabled = isProcessed;
  if (isProcessed) btn.removeAttribute('aria-pressed');
  else btn.setAttribute('aria-pressed', String(account.included));
  btn.title = isProcessed
    ? 'This account has already been processed'
    : (account.included ? 'Click to exclude this account' : 'Click to include this account');
}

// Empty-state markup shared by both layouts: a muted magnifier + guidance.
const EMPTY_STATE_INNER = `
  <div class="flex flex-col items-center gap-3">
    <svg class="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
    <div>
      <p class="text-sm font-medium text-gray-600">No accounts match your filters</p>
      <p class="text-xs text-gray-500 mt-1">Try a different search term or clear your filters.</p>
    </div>
  </div>`;

function createEmptyStateRow() {
  const tr = document.createElement('tr');
  const td = document.createElement('td');
  td.colSpan = 5;
  td.className = 'px-4 py-16 text-center';
  td.innerHTML = EMPTY_STATE_INNER;
  tr.appendChild(td);
  return tr;
}

function createEmptyStateCard() {
  const div = document.createElement('div');
  div.className = 'px-4 py-12 text-center';
  div.innerHTML = EMPTY_STATE_INNER;
  return div;
}

// Balance text color: muted when processed, red for negative (liabilities),
// neutral otherwise — a subtle scanning cue without coloring every row.
function balanceColorClass(account) {
  if (account.status === 'processed') return 'text-gray-500';
  return account.balance < 0 ? 'text-red-600' : 'text-gray-900';
}

// Consistent inline warning glyph (replaces the OS-dependent ⚠️ emoji).
function createWarningIcon() {
  const span = document.createElement('span');
  span.className = 'text-amber-500 cursor-default flex-shrink-0';
  span.title = 'Previously failed to process';
  span.innerHTML = '<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/></svg>';
  return span;
}

function createAccountRowElement(account) {
  const row = document.createElement('tr');
  row.className = 'hover:bg-gray-50 transition-colors';

  const isProcessed = account.status === 'processed';
  const isFailed = account.status === 'failed';

  // Account checkbox cell
  const checkboxTd = document.createElement('td');
  checkboxTd.className = 'px-3 sm:px-4 py-2 text-center';
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  const checkboxId = `account-checkbox-${account.id || account.modifiedName.replace(/\s+/g, '-')}`;
  checkbox.id = checkboxId;
  checkbox.name = checkboxId;
  checkbox.setAttribute('aria-label', `Select account: ${account.modifiedName}`);
  checkbox.className = 'w-5 h-5';
  toggleDisabled(checkbox, isProcessed);
  checkbox.checked = account.selected;
  checkbox.addEventListener('change', () => {
    account.selected = checkbox.checked;
    refreshBulkActionBar();
    updateMasterCheckbox(getVisibleAccounts());
  });
  checkboxTd.appendChild(checkbox);
  row.appendChild(checkboxTd);

  // Account name cell (read-only — renaming happens later, only for accounts
  // being created new in Monarch).
  const nameTd = document.createElement('td');
  nameTd.className = 'px-3 sm:px-4 py-2 max-w-[300px] truncate font-medium text-gray-900 cursor-default';
  nameTd.textContent = account.modifiedName;
  nameTd.title = account.modifiedName;
  if (isProcessed) nameTd.classList.add('text-gray-500');
  row.appendChild(nameTd);

  // Account Transaction Count cell
  const txTd = document.createElement('td');
  txTd.className = 'px-3 sm:px-4 py-2 text-center text-gray-600 tabular-nums cursor-default';
  txTd.textContent = account.transactionCount;
  txTd.title = `${account.transactionCount} transaction${account.transactionCount !== 1 ? 's' : ''}`;
  if (isProcessed) txTd.classList.add('text-gray-500');
  row.appendChild(txTd);

  // Account Balance cell
  const balanceTd = document.createElement('td');
  balanceTd.className = `px-3 sm:px-4 py-2 text-right font-medium tabular-nums cursor-default ${balanceColorClass(account)}`;
  balanceTd.textContent = currencyFormatter.format(account.balance);
  balanceTd.title = `Balance: ${currencyFormatter.format(account.balance)}`;
  row.appendChild(balanceTd);

  // Account Include/Exclude cell. Fixed width keeps the column from resizing
  // when toggling between "Included"/"Excluded"/"Processed".
  const includeTd = document.createElement('td');
  includeTd.className = 'px-3 sm:px-4 py-2 flex items-center justify-center gap-2';
  includeTd.appendChild(createInclusionToggle(account, { fixedWidth: true }));

  if (isFailed) {
    includeTd.appendChild(createWarningIcon());
  }

  row.appendChild(includeTd);
  return row;
}

function createMobileAccountCard(account) {
  const card = document.createElement('div');
  card.className = 'mobile-account-card';

  const isProcessed = account.status === 'processed';
  const isFailed = account.status === 'failed';

  // Custom checkbox container
  const checkboxContainer = document.createElement('label');
  checkboxContainer.className = 'custom-checkbox-container flex-shrink-0';
  
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.className = 'custom-checkbox-input';
  const checkboxId = `mobile-account-checkbox-${account.id || account.modifiedName.replace(/\s+/g, '-')}`;
  checkbox.id = checkboxId;
  checkbox.name = checkboxId;
  checkbox.setAttribute('aria-label', `Select account: ${account.modifiedName}`);
  checkbox.disabled = isProcessed;
  checkbox.checked = account.selected || false;
  checkbox.addEventListener('change', () => {
    account.selected = checkbox.checked;
    persistState();
    refreshBulkActionBar();
    updateMasterCheckbox(getVisibleAccounts());
    updateMobileSelectionCount();
  });

  const checkboxVisual = document.createElement('span');
  checkboxVisual.className = 'custom-checkbox-visual';

  checkboxContainer.appendChild(checkbox);
  checkboxContainer.appendChild(checkboxVisual);
  card.appendChild(checkboxContainer);

  // Card content container
  const contentDiv = document.createElement('div');
  contentDiv.className = 'card-content';

  // Top row: account name (truncates) with the inclusion pill inline on the
  // right, so a long name never pushes the pill onto its own wrapping line.
  const topRow = document.createElement('div');
  topRow.className = 'flex items-start justify-between gap-3';

  const nameDiv = document.createElement('div');
  nameDiv.className = `font-medium truncate min-w-0 ${isProcessed ? 'text-gray-500' : 'text-gray-900'}`;
  nameDiv.textContent = account.modifiedName;
  nameDiv.title = account.modifiedName;
  topRow.appendChild(nameDiv);

  const actions = document.createElement('div');
  actions.className = 'flex items-center gap-2 flex-shrink-0';
  if (isFailed) actions.appendChild(createWarningIcon());
  actions.appendChild(createInclusionToggle(account));
  topRow.appendChild(actions);

  contentDiv.appendChild(topRow);

  // Meta row: transaction count (left) and balance (right).
  const metaRow = document.createElement('div');
  metaRow.className = 'mt-1.5 flex items-center justify-between gap-3 text-sm';

  const transactionInfo = document.createElement('span');
  transactionInfo.className = isProcessed ? 'text-gray-500' : 'text-gray-600';
  transactionInfo.textContent = `${account.transactionCount} transaction${account.transactionCount !== 1 ? 's' : ''}`;

  const balanceInfo = document.createElement('span');
  balanceInfo.className = `font-medium tabular-nums ${balanceColorClass(account)}`;
  balanceInfo.textContent = currencyFormatter.format(account.balance);

  metaRow.appendChild(transactionInfo);
  metaRow.appendChild(balanceInfo);
  contentDiv.appendChild(metaRow);

  card.appendChild(contentDiv);
  return card;
}

function updateMasterCheckbox(visibleAccounts) {
  const masterCheckbox = document.getElementById('masterCheckbox');
  const masterCheckboxMobile = document.getElementById('masterCheckboxMobile');
  const selectedCount = visibleAccounts.filter(acc => acc.selected).length;
  const isChecked = selectedCount > 0 && selectedCount === visibleAccounts.length;
  const isIndeterminate = selectedCount > 0 && selectedCount < visibleAccounts.length;
  
  if (masterCheckbox) {
    masterCheckbox.checked = isChecked;
    masterCheckbox.indeterminate = isIndeterminate;
  }
  
  if (masterCheckboxMobile) {
    masterCheckboxMobile.checked = isChecked;
    masterCheckboxMobile.indeterminate = isIndeterminate;
  }
  
  updateMobileSelectionCount();
}

function updateMobileSelectionCount() {
  const countElement = document.getElementById('mobileSelectionCount');
  if (countElement) {
    const selectedCount = Object.values(state.accounts).filter(acc => acc.selected).length;
    countElement.textContent = `${selectedCount} selected`;
  }
}

function getVisibleAccounts() {
  return Object.values(state.accounts).filter(account => {
    if (account.status === 'processed') return false;
    
    // Apply advanced filters
    if (!passesFilters(account)) return false;
    
    // Apply search query
    if (searchQuery && !account.modifiedName.toLowerCase().includes(searchQuery)) return false;
    
    return true;
  });
}

function masterCheckboxChange(e) {
  const checked = e.target.checked;
  getVisibleAccounts().forEach(acc => {
    acc.selected = checked;
  });
  renderAccountTable();
}

function refreshBulkActionBar() {
  const bar = document.getElementById('bulkActionBar');
  const selectedCount = Object.values(state.accounts).filter(acc => acc.selected).length;
  
  // Update mobile count
  const mobileCountSpan = document.getElementById('selectedCountMobile');
  if (mobileCountSpan) {
    mobileCountSpan.textContent = selectedCount;
  }
  
  // Update desktop count
  const desktopCountSpan = document.getElementById('selectedCountDesktop');
  if (desktopCountSpan) {
    desktopCountSpan.textContent = selectedCount;
  }
  
  // Show/hide bulk action bar. While it floats over the bottom of the page,
  // pad the content so it can never cover the Continue button.
  const reviewRoot = document.querySelector('.flex.flex-col.max-w-7xl');
  if (reviewRoot) reviewRoot.classList.toggle('pb-28', selectedCount > 0);

  if (selectedCount > 0) {
    bar.classList.remove('hidden');
    bar.classList.add('active');
  } else {
    bar.classList.remove('active');
    setTimeout(() => {
      if (!bar.classList.contains('active')) {
        bar.classList.add('hidden');
      }
    }, 300);
  }
}


// Advanced Filters Functions
function initializeFiltersModal() {
  // Count badge, clear-filters button, and results summary are all kept in
  // sync by updateAccountCountDisplay() on every renderAccountTable().
}

function openFiltersModal() {
  console.log('Opening filters modal...');
  
  try {
    // Populate current filter values
    const filterAccountName = document.getElementById('filterAccountName');
    if (filterAccountName) {
      filterAccountName.value = activeFilters.accountName;
    }
    
    const nameMatchType = document.querySelector(`input[name="nameMatchType"][value="${activeFilters.nameMatchType}"]`);
    if (nameMatchType) {
      nameMatchType.checked = true;
    }
    
    const nameCaseSensitive = document.getElementById('nameCaseSensitive');
    if (nameCaseSensitive) {
      nameCaseSensitive.checked = activeFilters.nameCaseSensitive;
    }
    
    // Update number inputs
    const filterTransactionsMin = document.getElementById('filterTransactionsMin');
    if (filterTransactionsMin) {
      filterTransactionsMin.value = activeFilters.transactionsMin || '';
    }
    
    const filterTransactionsMax = document.getElementById('filterTransactionsMax');
    if (filterTransactionsMax) {
      filterTransactionsMax.value = activeFilters.transactionsMax || '';
    }
    
    const filterBalanceMin = document.getElementById('filterBalanceMin');
    if (filterBalanceMin) {
      filterBalanceMin.value = activeFilters.balanceMin || '';
    }
    
    const filterBalanceMax = document.getElementById('filterBalanceMax');
    if (filterBalanceMax) {
      filterBalanceMax.value = activeFilters.balanceMax || '';
    }
    
    // Update inclusion radio
    const inclusionFilter = document.querySelector(`input[name="inclusionFilter"][value="${activeFilters.inclusion}"]`);
    if (inclusionFilter) {
      inclusionFilter.checked = true;
    }
    
    const modal = document.getElementById('filtersModal');
    if (modal) {
      console.log('Found modal, showing it...');
      lastFocusedBeforeModal = document.activeElement;
      modal.classList.remove('hidden');
      document.addEventListener('keydown', trapModalTab);
      setTimeout(() => {
        modal.classList.add('show');
        // Move focus into the dialog for keyboard/screen-reader users.
        const firstField = document.getElementById('filterAccountName');
        if (firstField) firstField.focus();
      }, 10);
    } else {
      console.error('Modal not found!');
    }
  } catch (error) {
    console.error('Error opening filters modal:', error);
  }
}

// Keep Tab focus inside the open dialog (simple two-edge wrap).
let lastFocusedBeforeModal = null;
function trapModalTab(e) {
  if (e.key !== 'Tab') return;
  const modal = document.getElementById('filtersModal');
  if (!modal || modal.classList.contains('hidden')) return;
  const focusable = modal.querySelectorAll(
    'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
  );
  if (!focusable.length) return;
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault();
    last.focus();
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault();
    first.focus();
  }
}

// Expose globally for onclick handler
window.openFiltersModal = openFiltersModal;

function closeFiltersModal() {
  const modal = document.getElementById('filtersModal');
  document.removeEventListener('keydown', trapModalTab);
  modal.classList.remove('show');
  setTimeout(() => modal.classList.add('hidden'), 300);
  // Restore focus to whatever opened the dialog (e.g. the Filters button).
  if (lastFocusedBeforeModal && typeof lastFocusedBeforeModal.focus === 'function') {
    lastFocusedBeforeModal.focus();
    lastFocusedBeforeModal = null;
  }
}

// Expose globally for onclick handlers
window.closeFiltersModal = closeFiltersModal;

function applyFilters() {
  console.log('Apply filters button clicked!');
  
  try {
    // Account name filter
    const filterAccountName = document.getElementById('filterAccountName');
    activeFilters.accountName = filterAccountName ? filterAccountName.value.trim() : '';
    
    const nameMatchType = document.querySelector('input[name="nameMatchType"]:checked');
    activeFilters.nameMatchType = nameMatchType ? nameMatchType.value : 'contains';
    
    const nameCaseSensitive = document.getElementById('nameCaseSensitive');
    activeFilters.nameCaseSensitive = nameCaseSensitive ? nameCaseSensitive.checked : false;
    
    // Transactions filters
    const transMin = document.getElementById('filterTransactionsMin');
    const transMax = document.getElementById('filterTransactionsMax');
    activeFilters.transactionsMin = transMin && transMin.value ? parseInt(transMin.value) : null;
    activeFilters.transactionsMax = transMax && transMax.value ? parseInt(transMax.value) : null;
    
    // Balance filters
    const balMin = document.getElementById('filterBalanceMin');
    const balMax = document.getElementById('filterBalanceMax');
    activeFilters.balanceMin = balMin && balMin.value ? parseFloat(balMin.value) : null;
    activeFilters.balanceMax = balMax && balMax.value ? parseFloat(balMax.value) : null;
    
    // Inclusion filter
    const inclusionFilter = document.querySelector('input[name="inclusionFilter"]:checked');
    activeFilters.inclusion = inclusionFilter ? inclusionFilter.value : 'all';
    
    console.log('Applied filters:', activeFilters);
    
    closeFiltersModal();
    renderAccountTable();
    persistState();
  } catch (error) {
    console.error('Error applying filters:', error);
  }
}

// Expose globally for onclick handler
window.applyFilters = applyFilters;

function resetFilters() {
  console.log('Reset filters button clicked!');
  
  try {
    // Reset all form fields
    const filterAccountName = document.getElementById('filterAccountName');
    if (filterAccountName) filterAccountName.value = '';
    
    const containsRadio = document.querySelector('input[name="nameMatchType"][value="contains"]');
    if (containsRadio) containsRadio.checked = true;
    
    const nameCaseSensitive = document.getElementById('nameCaseSensitive');
    if (nameCaseSensitive) nameCaseSensitive.checked = false;

    const filterTransactionsMin = document.getElementById('filterTransactionsMin');
    if (filterTransactionsMin) filterTransactionsMin.value = '';
    
    const filterTransactionsMax = document.getElementById('filterTransactionsMax');
    if (filterTransactionsMax) filterTransactionsMax.value = '';
    
    const filterBalanceMin = document.getElementById('filterBalanceMin');
    if (filterBalanceMin) filterBalanceMin.value = '';
    
    const filterBalanceMax = document.getElementById('filterBalanceMax');
    if (filterBalanceMax) filterBalanceMax.value = '';
    
    const allRadio = document.querySelector('input[name="inclusionFilter"][value="all"]');
    if (allRadio) allRadio.checked = true;
    
    // Reset active filters
    activeFilters = {
      accountName: '',
      nameMatchType: 'contains',
      nameCaseSensitive: false,
      transactionsMin: null,
      transactionsMax: null,
      balanceMin: null,
      balanceMax: null,
      inclusion: 'all'
    };
    
    renderAccountTable();
    persistState();

    // Close the modal after resetting
    closeFiltersModal();
    
    console.log('Filters reset successfully');
  } catch (error) {
    console.error('Error resetting filters:', error);
  }
}

// Expose globally for onclick handler
window.resetFilters = resetFilters;

function clearAllFilters() {
  console.log('Clear all filters clicked!');
  resetFilters();
  closeFiltersModal();
}

// Expose globally for onclick handler
window.clearAllFilters = clearAllFilters;

function passesFilters(account) {
  // Account name filter
  if (activeFilters.accountName) {
    const accountName = activeFilters.nameCaseSensitive ? account.modifiedName : account.modifiedName.toLowerCase();
    const filterName = activeFilters.nameCaseSensitive ? activeFilters.accountName : activeFilters.accountName.toLowerCase();
    
    if (activeFilters.nameMatchType === 'exact') {
      if (accountName !== filterName) return false;
    } else {
      if (!accountName.includes(filterName)) return false;
    }
  }
  
  // Transaction count filter
  const transactionCount = account.transactionCount || 0;
  if (activeFilters.transactionsMin !== null && transactionCount < activeFilters.transactionsMin) return false;
  if (activeFilters.transactionsMax !== null && transactionCount > activeFilters.transactionsMax) return false;
  
  // Balance filter
  const balance = parseFloat(account.balance) || 0;
  if (activeFilters.balanceMin !== null && balance < activeFilters.balanceMin) return false;
  if (activeFilters.balanceMax !== null && balance > activeFilters.balanceMax) return false;
  
  // Inclusion filter
  if (activeFilters.inclusion === 'included' && !account.included) return false;
  if (activeFilters.inclusion === 'excluded' && account.included) return false;
  
  return true;
}

function updateAccountCountDisplay(visibleCount, totalCount) {
  const visibleAccountCount = document.getElementById('visibleAccountCount');
  const totalAccountCount = document.getElementById('totalAccountCount');
  const filterResultsSummary = document.getElementById('filterResultsSummary');
  const filterNotificationBadge = document.getElementById('filterNotificationBadge');
  const clearFiltersBtn = document.getElementById('clearFiltersBtn');
  
  if (visibleAccountCount) visibleAccountCount.textContent = visibleCount;
  if (totalAccountCount) totalAccountCount.textContent = totalCount;
  
  // Check if filters are active and count them
  const hasFilters = hasActiveFilters();
  const filterCount = countActiveFilters();
  
  // Show/hide and update the notification badge
  if (hasFilters && filterCount > 0 && filterNotificationBadge) {
    filterNotificationBadge.textContent = filterCount;
    filterNotificationBadge.classList.remove('hidden');
  } else if (filterNotificationBadge) {
    filterNotificationBadge.classList.add('hidden');
  }
  
  // Show/hide clear filters button
  if (hasFilters && clearFiltersBtn) {
    clearFiltersBtn.classList.remove('hidden');
  } else if (clearFiltersBtn) {
    clearFiltersBtn.classList.add('hidden');
  }
  
  // Add subtle styling to results summary when filtered
  if (hasFilters && filterResultsSummary) {
    filterResultsSummary.classList.add('filtered');
  } else if (filterResultsSummary) {
    filterResultsSummary.classList.remove('filtered');
  }
}

function hasActiveFilters() {
  return activeFilters.accountName ||
         activeFilters.transactionsMin !== null ||
         activeFilters.transactionsMax !== null ||
         activeFilters.balanceMin !== null ||
         activeFilters.balanceMax !== null ||
         activeFilters.inclusion !== 'all';
}

function countActiveFilters() {
  let count = 0;
  
  // Account name filter
  if (activeFilters.accountName) {
    count++;
  }
  
  // Transaction count range filter
  if (activeFilters.transactionsMin !== null || activeFilters.transactionsMax !== null) {
    count++;
  }
  
  // Balance range filter
  if (activeFilters.balanceMin !== null || activeFilters.balanceMax !== null) {
    count++;
  }
  
  // Inclusion status filter (only count if not 'all')
  if (activeFilters.inclusion !== 'all') {
    count++;
  }
  
  return count;
}
