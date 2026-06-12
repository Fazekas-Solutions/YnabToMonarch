import fetch from 'node-fetch';
import { graphqlHeaders } from '../../shared/monarchHeaders.js';

const GRAPHQL_ENDPOINT = 'https://api.monarch.com/graphql';

// Returns the user's existing Monarch categories and tags so the mapping wizard
// can offer them as targets to map YNAB categories/tags onto.
export async function handler(event) {
  console.group('fetchMonarchMappingOptions');
  if (event.httpMethod !== 'POST') {
    console.groupEnd('fetchMonarchMappingOptions');
    return respond(405, { error: 'Method not allowed. Use POST.' });
  }

  try {
    const { token } = JSON.parse(event.body);
    if (!token) {
      console.groupEnd('fetchMonarchMappingOptions');
      return respond(400, { error: 'Token is required.' });
    }

    const [categoryGroups, tags] = await Promise.all([
      fetchCategoryGroups(token),
      fetchTags(token)
    ]);

    console.groupEnd('fetchMonarchMappingOptions');
    return respond(200, { categoryGroups, tags });
  } catch (error) {
    console.error('❌ Error fetching mapping options:', error);
    console.groupEnd('fetchMonarchMappingOptions');
    return respond(502, { error: error.message });
  }
}

async function fetchCategoryGroups(token) {
  const data = await gql(token, `
    query Web_GetCategories {
      categoryGroups {
        id
        name
        order
        type
        categories {
          id
          name
          icon
          order
          __typename
        }
        __typename
      }
    }
  `);
  return (data?.categoryGroups || [])
    .slice()
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    .map(g => ({
      id: g.id,
      name: g.name,
      type: g.type,
      categories: (g.categories || [])
        .slice()
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
        .map(({ id, name, icon }) => ({ id, name, icon }))
    }));
}

async function fetchTags(token) {
  const data = await gql(token, `
    query Common_GetHouseholdTransactionTags($search: String, $limit: Int, $bulkParams: BulkTransactionDataParams) {
      householdTransactionTags(search: $search, limit: $limit, bulkParams: $bulkParams) {
        id
        name
        color
        order
        __typename
      }
    }
  `);
  return (data?.householdTransactionTags || [])
    .slice()
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    .map(({ id, name, color }) => ({ id, name, color }));
}

async function gql(token, query, variables = {}) {
  const res = await fetch(GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers: graphqlHeaders(token),
    body: JSON.stringify({ query, variables })
  });

  const result = await res.json().catch(() => null);
  if (!res.ok || !result || result.errors) {
    const message = result?.errors?.map(e => e.message).join('; ')
      || result?.error
      || result?.detail
      || `Monarch responded with status ${res.status}`;
    throw new Error(message);
  }
  return result.data;
}

function respond(statusCode, payload) {
  return {
    statusCode,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  };
}
