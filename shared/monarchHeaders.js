// Centralized Monarch client headers.
//
// Monarch validates these client-identity headers on every request. Missing or
// stale values cause requests to be rejected, which breaks the whole
// integration. Keep `MONARCH_CLIENT_VERSION` in sync with the version observed
// in real browser traffic against api.monarch.com.
export const MONARCH_CLIENT_VERSION = 'v1.0.2697';

const USER_AGENT =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36';

/**
 * Headers for Monarch GraphQL requests (https://api.monarch.com/graphql).
 *
 * @param {string} token - Monarch auth token.
 */
export function graphqlHeaders(token) {
  return {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'client-platform': 'web',
    'monarch-client': 'monarch-core-web-app-graphql',
    'monarch-client-version': MONARCH_CLIENT_VERSION,
    origin: 'https://app.monarch.com',
    'User-Agent': USER_AGENT,
    Authorization: `Token ${token}`,
  };
}

/**
 * Headers for Monarch REST requests (auth/login, statements upload).
 *
 * `Content-Type` is intentionally omitted so callers can set it themselves
 * (e.g. multipart form-data needs the boundary from `form.getHeaders()`).
 *
 * @param {object} [opts]
 * @param {string} [opts.token] - Monarch auth token, if authenticated.
 * @param {string} [opts.deviceUuid] - Device UUID, required for login.
 * @param {object} [opts.extra] - Additional headers to merge in.
 */
export function restHeaders({ token, deviceUuid, extra } = {}) {
  return {
    Accept: 'application/json',
    'client-platform': 'web',
    'monarch-client': 'monarch-core-web-app-rest',
    'monarch-client-version': MONARCH_CLIENT_VERSION,
    origin: 'https://app.monarch.com',
    'User-Agent': USER_AGENT,
    ...(token && { Authorization: `Token ${token}` }),
    ...(deviceUuid && { 'device-uuid': deviceUuid }),
    ...extra,
  };
}
