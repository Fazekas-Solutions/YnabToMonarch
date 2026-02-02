import { postJson } from './utils.js';

const BASE_URL = '/.netlify/functions/';

/** API endpoint configuration.
 * Netlify Dev serves both the site and functions at the same origin.
 * In production: /.netlify/functions/
 * In local dev: /.netlify/functions/ (netlify dev proxies it)
 */
const API = {
  login: BASE_URL + 'monarchLogin',
  fetchAccounts: BASE_URL + 'fetchMonarchAccounts',
  createAccounts: BASE_URL + 'createMonarchAccounts',
  generateStatements: BASE_URL + 'generateStatements',
  getUploadStatus: BASE_URL + 'getUploadStatus',
};

/** Authenticates with Monarch Money API.
 * @param {string} email - User email address.
 * @param {string} encryptedPassword - Encrypted password.
 * @param {string} deviceUuid - Device UUID.
 * @param {string} otp - One-time password (optional).
 * @returns {Promise<Object>} Authentication response with token.
 */
export async function login(email, encryptedPassword, deviceUuid, otp) {
  try {
    return await postJson(API.login, { email, encryptedPassword, deviceUuid, otp });
  } catch (error) {
    console.error('Monarch login failed:', error);
    throw new Error('Failed to authenticate with Monarch Money');
  }
}

/** Fetches Monarch Money accounts for the authenticated user.
 * @param {string} token - Authentication token.
 * @returns {Promise<Object>} Response containing user's Monarch accounts.
 */
export async function fetchMonarchAccounts(token) {
  try {
    return await postJson(API.fetchAccounts, { token });
  } catch (error) {
    console.error('Monarch fetch accounts failed:', error);
    throw new Error('Failed to fetch Monarch Money accounts');
  }
}

/** Creates accounts in Monarch Money.
 * @param {string} token - Authentication token.
 * @param {Array} accounts - Array of account objects to create.
 * @returns {Promise<Object>} Response from account creation.
 */
export async function createAccounts(token, accounts) {
  try {
    return await postJson(API.createAccounts, { token, accounts });
  } catch (error) {
    console.error('Monarch create accounts failed:', error);
    throw new Error('Failed to create accounts in Monarch Money');
  }
}

/** Generates bank statements for the provided accounts.
 * @param {Array} accounts - Array of account objects.
 * @returns {Promise<Response>} Raw response from statement generation.
 */
export async function generateAccounts(accounts) {
  try {
    return await fetch(API.generateStatements, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ accounts }),
    });
  } catch (error) {
    console.error('Monarch generate statements failed:', error);
    throw new Error('Failed to generate Monarch Money statements');
  }
}

/** Queries the upload status for Monarch accounts.
 * @param {string} token - Authentication token.
 * @param {string} sessionKey - Session key from account creation.
 * @returns {Promise<Object>} Upload status response.
 */
export async function queryUploadStatus(token, sessionKey) {
  try {
    return await postJson(API.getUploadStatus, { token, sessionKey });
  } catch (error) {
    console.error('Monarch query upload status failed:', error);
    throw new Error('Failed to query Monarch Money upload status');
  }
}

const monarchApi = {
  login,
  fetchMonarchAccounts,
  createAccounts,
  generateAccounts,
  queryUploadStatus,
};

export default monarchApi;
