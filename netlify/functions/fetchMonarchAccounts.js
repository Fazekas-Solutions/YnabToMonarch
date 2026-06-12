import fetch from 'node-fetch';
import { graphqlHeaders } from '../../shared/monarchHeaders.js';

export async function handler(event, context) {
  console.group("fetchMonarchAccounts")

  if (event.httpMethod !== 'POST') {
    console.warn("MonarchAccount ❌ wrong method", { method: event.httpMethod });
    console.groupEnd("fetchMonarchAccounts")
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed. Use POST.' })
    }
  }
  try {
    const { token } = JSON.parse(event.body)
    if (!token) {
      console.error("MonarchAccount ❌ missing token");
      console.groupEnd("fetchMonarchAccounts")
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Token is required.' })
      }
    }

    const response = await fetch('https://api.monarch.com/graphql', {
      method: 'POST',
      headers: graphqlHeaders(token),
      body: JSON.stringify({ query: 'query { accounts { id displayName } }' })
    })

    const result = await response.json().catch(() => null);
    if (!response.ok || !result || result.errors) {
      const message = result?.errors?.map(e => e.message).join('; ')
        || result?.error
        || result?.detail
        || 'Account fetch failed.'
      console.error("MonarchAccount ❌ API responded with error", { status: response.status, error: message })
      console.groupEnd("fetchMonarchAccounts")
      return {
        statusCode: response.ok ? 502 : response.status,
        body: JSON.stringify({ error: message })
      }
    }
    console.groupEnd("fetchMonarchAccounts")
    return {
      statusCode: 200,
      body: JSON.stringify({ accounts: result.data.accounts })
    }
  } catch (error) {
    console.error("MonarchAccount ❌ unexpected error", error)
    console.groupEnd("fetchMonarchAccounts")
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' })
    }
  }
}
