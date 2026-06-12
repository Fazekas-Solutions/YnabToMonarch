import fetch from 'node-fetch';
import { graphqlHeaders } from '../../shared/monarchHeaders.js';

const MONARCH_GRAPHQL_ENDPOINT = 'https://api.monarch.com/graphql';

export async function handler(event) {
  console.group("getUploadStatus")
  if (event.httpMethod !== 'POST') {
    console.groupEnd("getUploadStatus")
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }

  try {
    const { token, sessionKey } = JSON.parse(event.body);

    const res = await fetch(MONARCH_GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: graphqlHeaders(token),
      body: JSON.stringify({
        operationName: 'GetUploadStatementSession',
        variables: { sessionKey },
        query: `
          query GetUploadStatementSession($sessionKey: String!) {
            uploadStatementSession(sessionKey: $sessionKey) {
              sessionKey
              status
              errorMessage
              uploadedStatement {
                id
                transactionCount
              }
            }
          }
        `
      })
    });

    const result = await res.json().catch(() => null);

    // Surface upstream failures instead of returning a 200 with no `data`,
    // which would leave the client polling indefinitely.
    if (!res.ok || !result || result.errors) {
      const message = result?.errors?.map(e => e.message).join('; ')
        || result?.error
        || result?.detail
        || `Monarch responded with status ${res.status}`;
      console.error('❌ Upload status request rejected by Monarch:', { status: res.status, result });
      console.groupEnd("getUploadStatus")
      return {
        statusCode: 502,
        body: JSON.stringify({ error: message })
      };
    }

    console.groupEnd("getUploadStatus")
    return {
      statusCode: 200,
      body: JSON.stringify(result)
    };
  } catch (error) {
    console.error('❌ Error fetching upload status:', error);
    console.groupEnd("getUploadStatus")
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
}
