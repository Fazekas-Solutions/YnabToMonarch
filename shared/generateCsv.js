/**
 * Column order of the generated CSV.
 *
 * The index of each column is meaningful: Monarch's statement parser is told
 * which column maps to which field via COLUMN_MAPPING below, which references
 * these positions. Keep the two in sync — reordering here means updating there.
 */
export const CSV_COLUMNS = [
  'Date',               // 0
  'Merchant',           // 1
  'Category',           // 2
  'Account',            // 3 (informational only; account is set via accountId)
  'Original Statement', // 4
  'Notes',              // 5
  'Amount',             // 6
  'Tags',               // 7
];

/**
 * Maps Monarch's internal field names to the CSV column index above. Passed
 * (stringified) as `columnMapping` to Web_ParseUploadStatementSession so the
 * parser knows how to interpret each column. The "Account" column is omitted
 * intentionally — the target account is identified by accountId, not a column.
 */
export const COLUMN_MAPPING = {
  date: 0,
  merchant_name: 1,
  category: 2,
  data_provider_description: 4,
  notes: 5,
  amount: 6,
  tags: 7,
};

/**
 * Monarch's importable transaction fields, in the order shown in its import
 * wizard. `key` is Monarch's internal field name (used in columnMapping);
 * `required` fields must be assigned a column before an import can proceed.
 */
export const MONARCH_FIELDS = [
  { key: 'amount', label: 'Amount', required: true },
  { key: 'date', label: 'Date', required: true },
  { key: 'category', label: 'Category', required: false },
  { key: 'data_provider_description', label: 'Data Provider Description', required: false },
  { key: 'merchant_name', label: 'Merchant Name', required: false },
  { key: 'notes', label: 'Notes', required: false },
  { key: 'tags', label: 'Tags', required: false },
];

/**
 * Generates a CSV string from a list of transactions for a given account.
 *
 * Each row represents a transaction with columns matching CSV_COLUMNS:
 * Date, Merchant, Category, Account, Original Statement, Notes, Amount, Tags.
 *
 * Fields are wrapped in double quotes and comma-separated for proper CSV formatting.
 *
 * @param {string} accountName - The name of the account to include in the "Account" column.
 * @param {Array<Object>} transactions - An array of transaction objects with fields:
 *   - Date {string}
 *   - Merchant {string}
 *   - Category {string}
 *   - Notes {string}
 *   - Amount {string|number}
 *   - Tags {string}
 *
 * @returns {string} - A well-formed CSV string including headers and all transaction rows.
 */
export default function generateCSV(accountName, transactions) {
  const headers = CSV_COLUMNS.map(col => `"${col}"`).join(',');
  const rows = transactions.map(tx =>
    `"${tx.Date}","${tx.Merchant}","${tx.Category}","${accountName}","","${tx.Notes}","${tx.Amount}","${tx.Tags}"`
  );
  return [headers, ...rows].join('\n');
}
