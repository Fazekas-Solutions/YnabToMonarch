// Shared helpers for the category/tag/priority mapping step.
//
// Used by both the frontend mapping wizard (to derive distinct values and
// pre-select sensible defaults) and the backend (to auto-build a mapping when
// the client doesn't supply one). Pure JS, no Node/browser dependencies, so it
// bundles cleanly into both targets.

// Mapping directive values understood by Monarch's parser.
export const CATEGORY_NEW = 'add_expense_category';
export const CATEGORY_NEW_INCOME = 'add_income_category';
export const TAG_NEW = 'add_tag';
export const TAG_IGNORE = 'ignore';
export const UNCATEGORIZED = 'Uncategorized';

// Sentinel for "create a brand-new Monarch account" in the account-mapping step,
// as opposed to importing into an existing account (identified by its id).
export const ACCOUNT_CREATE_NEW = '__create_new__';

// Import-priority options shown in the wizard.
//
// NOTE: only 'statement_transactions' is confirmed from real Monarch traffic;
// the other two enum values are inferred from Monarch's UI labels and are
// UNVERIFIED. This is functionally moot for this app today because it always
// imports into freshly-created, empty accounts (nothing to overlap), so the
// default below is the confirmed-safe value.
export const IMPORT_PRIORITY_DEFAULT = 'statement_transactions';
export const IMPORT_PRIORITIES = [
  {
    value: 'statement_transactions',
    title: 'Prioritize CSV transactions',
    description: "Replace existing Monarch transactions that overlap the CSV's date range with the CSV data.",
  },
  {
    value: 'existing_transactions',
    title: 'Prioritize Monarch transactions',
    description: 'Only import CSV transactions older than your oldest existing Monarch transaction; ignore the rest.',
  },
  {
    value: 'all_transactions',
    title: 'Import all transactions',
    description: 'Import everything from the CSV without removing existing Monarch transactions (may create duplicates).',
  },
];

/**
 * Collects the distinct, non-empty values of `field` across all transactions,
 * with the count of transactions using each, sorted by frequency.
 *
 * @param {Array<Object>} accounts - Account objects with a `transactions` array.
 * @param {string} field - Transaction field to inspect (e.g. 'Category', 'Tags').
 * @returns {Array<{value: string, count: number}>}
 */
export function collectValueCounts(accounts, field) {
  const counts = new Map();
  for (const account of accounts || []) {
    for (const tx of account.transactions || []) {
      const value = (tx[field] ?? '').toString().trim();
      if (!value) continue;
      counts.set(value, (counts.get(value) || 0) + 1);
    }
  }
  return [...counts.entries()]
    .map(([value, count]) => ({ value, count }))
    .sort((a, b) => b.count - a.count || a.value.localeCompare(b.value));
}

/** Whether any transaction has a blank value for `field`. */
export function hasBlankValues(accounts, field) {
  return (accounts || []).some(a =>
    (a.transactions || []).some(tx => !((tx[field] ?? '').toString().trim()))
  );
}

/** Builds a lowercased name → canonical name lookup for existing entries. */
export function indexByName(entries) {
  return new Map((entries || []).map(e => [e.name.trim().toLowerCase(), e.name]));
}

/**
 * Default mapping choice for a CSV category: an existing Monarch category of the
 * same name when one exists, "Uncategorized" for blank/uncategorized, otherwise
 * a directive to create a new expense category.
 */
export function defaultCategoryValue(category, existingByName, uncategorizedName = UNCATEGORIZED) {
  const key = category.trim().toLowerCase();
  if (key === 'uncategorized') return uncategorizedName;
  return existingByName.get(key) || CATEGORY_NEW;
}

/**
 * Default mapping choice for a CSV tag: an existing Monarch tag of the same name
 * when one exists, otherwise a directive to create a new tag.
 */
export function defaultTagValue(tag, existingByName) {
  return existingByName.get(tag.trim().toLowerCase()) || TAG_NEW;
}

/**
 * Auto-builds the full categoryMapping (used server-side when the client doesn't
 * supply one). Maps onto existing categories by name, else flags for creation;
 * routes blank categories to Uncategorized.
 */
export function buildCategoryMapping(accounts, existingCategories) {
  const existingByName = indexByName(existingCategories);
  const uncategorizedName = existingByName.get('uncategorized') || UNCATEGORIZED;

  const mapping = {};
  for (const { value } of collectValueCounts(accounts, 'Category')) {
    mapping[value] = defaultCategoryValue(value, existingByName, uncategorizedName);
  }
  if (hasBlankValues(accounts, 'Category') && mapping.uncategorized === undefined) {
    mapping.uncategorized = uncategorizedName;
  }
  return mapping;
}

/**
 * Auto-builds the full tagMapping (used server-side when the client doesn't
 * supply one). Maps onto existing tags by name, else flags for creation.
 */
export function buildTagMapping(accounts, existingTags) {
  const existingByName = indexByName(existingTags);
  const mapping = {};
  for (const { value } of collectValueCounts(accounts, 'Tags')) {
    mapping[value] = defaultTagValue(value, existingByName);
  }
  return mapping;
}
