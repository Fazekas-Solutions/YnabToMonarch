// Loopback hosts all mean "local dev" — live-server may serve the page from
// 127.0.0.1 or ::1, not just `localhost`, so check for all of them. Otherwise
// API calls fall through to the static server (405 Method Not Allowed) instead
// of reaching serverless-offline.
const LOCAL_HOSTS = ['localhost', '127.0.0.1', '[::1]', '::1'];
const base = LOCAL_HOSTS.includes(location.hostname)
  ? 'http://localhost:3000/dev/'
  : '/.netlify/functions/';

export const API = {
  login: base + 'monarchLogin',
  fetchAccounts: base + 'fetchMonarchAccounts',
  mappingOptions: base + 'fetchMonarchMappingOptions',
  createAccounts: base + 'createMonarchAccounts',
  generateStatements: base + 'generateStatements',
  getUploadStatus: base + 'getUploadStatus',
};
