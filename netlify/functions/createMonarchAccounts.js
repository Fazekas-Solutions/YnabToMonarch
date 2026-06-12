import fetch from 'node-fetch';
import FormData from 'form-data';
import { Readable } from 'stream';
import generateCSV, { COLUMN_MAPPING } from '../../shared/generateCsv.js';
import { graphqlHeaders, restHeaders } from '../../shared/monarchHeaders.js';
import {
  buildCategoryMapping,
  buildTagMapping,
  ACCOUNT_CREATE_NEW,
  IMPORT_PRIORITY_DEFAULT
} from '../../shared/mappingHelpers.js';

// Constants for configuration
const GRAPHQL_ENDPOINT = 'https://api.monarch.com/graphql'
const STATEMENTS_UPLOAD_URL = 'https://api.monarch.com/statements/upload-async/'

const isNonEmpty = obj => obj && typeof obj === 'object' && Object.keys(obj).length > 0

export async function handler(event, context) {
  console.group("CreateMonarchAccounts Lambda Handler")

  // Validate HTTP method
  if (event.httpMethod !== 'POST') {
    console.warn("❌ wrong method", { method: event.httpMethod });
    return createResponse(405, { error: 'Method not allowed. Use POST.' })
  }

  try {
    const { accounts, token, accountMapping, columnMapping, categoryMapping, tagMapping, priorityMapping } = JSON.parse(event.body)

    // The mapping wizard normally supplies the category/tag mappings. If they're
    // absent (e.g. the client refreshed and lost them), fall back to building
    // them here: fetch the user's existing categories/tags and map onto matching
    // names, creating new ones otherwise. Best-effort — lookup failures just mean
    // everything is created new rather than aborting the migration.
    const included = accounts.filter(a => a.included);
    let finalCategoryMapping = isNonEmpty(categoryMapping) ? categoryMapping : null;
    let finalTagMapping = isNonEmpty(tagMapping) ? tagMapping : null;

    if (!finalCategoryMapping || !finalTagMapping) {
      let existingCategories = [];
      let existingTags = [];
      if (!finalCategoryMapping) {
        try { existingCategories = await getMonarchCategories(token); }
        catch (e) { console.warn("Couldn't fetch Monarch categories; new categories will be created.", e.message); }
        finalCategoryMapping = buildCategoryMapping(included, existingCategories);
      }
      if (!finalTagMapping) {
        try { existingTags = await getMonarchTags(token); }
        catch (e) { console.warn("Couldn't fetch Monarch tags; new tags will be created.", e.message); }
        finalTagMapping = buildTagMapping(included, existingTags);
      }
    }

    const mappings = {
      accountMapping: accountMapping || {},
      columnMapping: isNonEmpty(columnMapping) ? columnMapping : COLUMN_MAPPING,
      categoryMapping: finalCategoryMapping,
      tagMapping: finalTagMapping,
      priorityMapping: priorityMapping || {}
    };

    const results = await Promise.allSettled(accounts.map(account =>
      processAccount(token, account, mappings).then((result) => ({
        name: account.modifiedName,
        success: true,
        sessionKeys: result.sessionKeys || []
      })).catch(err => ({
        name: account.modifiedName,
        success: false,
        error: err.message
      }))
    ));

    const success = [];
    const failed = [];

    for (const result of results) {
      if (result.status === 'fulfilled' && result.value.success) {
        success.push({ name: result.value.name, sessionKeys: result.value.sessionKeys });
      } else {
        const failedResult = result.status === 'fulfilled' ? result.value : result.reason;
        failed.push({ name: failedResult.name, error: failedResult.error || 'Unknown error' });
      }
    }

    return createResponse(200, { success, failed });
  } catch (err) {
    console.error("❌ unexpected error", err)
    return createResponse(500, { error: err.message });
  } finally {
    console.groupEnd("CreateMonarchAccounts Lambda Handler")
  }
}

async function processAccount(token, account, mappings) {
  console.group("Process account")

  if (!account.included) {
    console.warn(`Skipping excluded account: ${account.modifiedName}`);
    return { skipped: true };
  }

  // Resolve the target account: either an existing Monarch account chosen in the
  // mapping step, or a brand-new account we create here.
  const target = (mappings.accountMapping || {})[account.accountName];
  let accountId;

  if (target && target !== ACCOUNT_CREATE_NEW) {
    accountId = target;
  } else {
    const accountInput = {
      type: account.type,
      subtype: account.subtype,
      includeInNetWorth: true,
      name: account.modifiedName,
      displayBalance: 0.0
    }
    const { account: newAccount, error } = await createManualAccount(token, accountInput)
    if (error) return { error }
    accountId = newAccount.id;
  }

  const txChunks = chunkArray(account.transactions, 3000);
  if (txChunks.length > 1) {
    console.warn(`Account ${account.modifiedName} has ${txChunks.length} chunks of transactions, which may take longer to process.`);
  }

  // Per-account import priority (only meaningful for existing accounts; new
  // accounts are empty so the value is inert).
  const importPriority = (mappings.priorityMapping || {})[account.accountName] || IMPORT_PRIORITY_DEFAULT;

  const sessionKeys = [];

  await Promise.all(txChunks.map(async (chunk) => {
    const { sessionKey } = await uploadStatementsFile(token, chunk, account.modifiedName);
    await importTransactions(token, accountId, sessionKey, { ...mappings, importPriority });
    sessionKeys.push(sessionKey);
  }));

  console.groupEnd()
  return { sessionKeys };
}

function chunkArray(arr, size) {
  const result = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

async function createManualAccount(token, input) {
  console.group("Creating Manual Account")

  const query = `
    mutation Web_CreateManualAccount($input: CreateManualAccountMutationInput!) {
      createManualAccount(input: $input) {
        account { id __typename }
        errors {
          fieldErrors { field messages __typename }
          message code __typename
        }
        __typename
      }
    }
  `;

  const res = await performGraphQLRequest(token, query, { input });

  if (res.error) return { error: res.error };
  if (res.data.createManualAccount.errors?.length) {
    console.groupEnd()
    return { error: res.data.createManualAccount.errors.map(e => e.message).join('; ') };
  }

  console.groupEnd()
  return { account: res.data.createManualAccount.account };
}

async function uploadStatementsFile(token, transactions, accountName) {
  console.group("Uploading Statements File")

  // Generate CSV content
  const csv = generateCSV(accountName, transactions)
  const csvStream = Readable.from([csv])

  // Prepare FormData
  const form = new FormData()
  form.append('file', csvStream, {
    filename: 'transactions.csv',
    contentType: 'text/csv'
  })
  // The web client sends a second, empty-named field ("false") alongside the
  // file. Mirror it so our request matches the upload endpoint's expectations.
  form.append('', 'false')

  const res = await fetch(STATEMENTS_UPLOAD_URL, {
    method: 'POST',
    headers: restHeaders({ token, extra: form.getHeaders() }),
    body: form
  })

  const result = await res.json().catch(() => ({}))

  if (!res.ok || !result.session_key) {
    console.error("❌ Upload failed", { status: res.status, result: result });
    console.groupEnd()
    throw new Error(`Upload failed: ${JSON.stringify(result)}`)
  }

  console.groupEnd()
  return { sessionKey: result.session_key }
}

async function importTransactions(token, accountId, sessionKey, mappings = {}) {
  console.group("Importing Transactions")

  const query = `
      mutation Web_ParseUploadStatementSession($input: ParseStatementInput!) {
          parseUploadStatementSession(input: $input) {
              uploadStatementSession {
                  ...UploadStatementSessionFields
                  __typename
              }
              __typename
          }
      }
      fragment UploadStatementSessionFields on UploadStatementSession {
          sessionKey
          status
          errorMessage
          skipCheckForDuplicates
          uploadedStatement {
              id
              transactionCount
              __typename
          }
          __typename
      }
  `

  // Monarch's parser now expects explicit mappings declaring how to interpret
  // columns and how to handle each category/tag value found in the CSV. These
  // map-typed inputs are passed as JSON-encoded strings.
  const variables = {
    input: {
      // 'mint_csv' is the generic CSV-import parser that respects an explicit
      // columnMapping (confirmed from real Monarch traffic). 'monarch_csv' is a
      // fixed-format parser that ignores/conflicts with columnMapping and makes
      // the parse session report status "errored".
      parserName: 'mint_csv',
      sessionKey,
      accountId,
      importPriority: mappings.importPriority || IMPORT_PRIORITY_DEFAULT,
      columnMapping: JSON.stringify(mappings.columnMapping || COLUMN_MAPPING),
      categoryMapping: JSON.stringify(mappings.categoryMapping || {}),
      tagMapping: JSON.stringify(mappings.tagMapping || {}),
      skipCheckForDuplicates: false,
      shouldUpdateBalance: true,
      allowWarnings: true
    }
  }

  const res = await performGraphQLRequest(token, query, variables)
  if (res.error) throw new Error(res.error);

  // The parse can fail at the data level while still returning HTTP 200 — surface
  // that error message instead of silently treating the import as successful.
  const session = res.data?.parseUploadStatementSession?.uploadStatementSession;
  if (session && ['failed', 'error', 'errored'].includes(session.status)) {
    console.groupEnd()
    const message = session.errorMessage && session.errorMessage !== 'None'
      ? session.errorMessage
      : 'Monarch could not parse the uploaded statement.';
    throw new Error(message);
  }

  console.groupEnd()
}

async function getMonarchCategories(token) {
  const query = `
    query Web_GetCategories {
      categories {
        id
        name
        __typename
      }
    }
  `;
  const res = await performGraphQLRequest(token, query, {});
  return res.data?.categories || [];
}

async function getMonarchTags(token) {
  const query = `
    query Common_GetHouseholdTransactionTags($search: String, $limit: Int, $bulkParams: BulkTransactionDataParams) {
      householdTransactionTags(search: $search, limit: $limit, bulkParams: $bulkParams) {
        id
        name
        __typename
      }
    }
  `;
  const res = await performGraphQLRequest(token, query, {});
  return res.data?.householdTransactionTags || [];
}

async function performGraphQLRequest(token, query, variables) {
  console.group("Performing GraphQL Request")

  const res = await fetch(GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers: graphqlHeaders(token),
    body: JSON.stringify({ query, variables })
  })

  const result = await res.json()

  if (!res.ok || result.errors) {

    // Check if subscription has ended
    if (result?.errors?.some(err => err.message.includes("SUBSCRIPTION_ENDED"))) {
      console.error("❌ Subscription has ended. Please renew your subscription or use a different account.");
      console.groupEnd("Performing GraphQL Request")
      throw new Error("Monarch subscription has ended. Please renew your subscription or use different account.")
    }

    console.groupEnd("Performing GraphQL Request")
    throw new Error(`GraphQL request failed: ${JSON.stringify(result.errors)}`);
  }

  console.groupEnd("Performing GraphQL Request")
  return { data: result.data }
}

function createResponse(statusCode, payload) {
  return {
    statusCode,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  }
}
