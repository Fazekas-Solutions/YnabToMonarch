import { API } from './config.js';
import { postJson } from './utils.js';

export const monarchApi = {
  login: (email, encryptedPassword, deviceUuid, otp) => postJson(API.login, { email, encryptedPassword, deviceUuid, otp }),
  fetchMonarchAccounts: token => postJson(API.fetchAccounts, { token }),
  fetchMappingOptions: token => postJson(API.mappingOptions, { token }),
  createAccounts: (token, accounts, mappings = {}) => postJson(API.createAccounts, {
    token,
    accounts,
    accountMapping: mappings.accountMapping,
    columnMapping: mappings.columnMapping,
    categoryMapping: mappings.categoryMapping,
    tagMapping: mappings.tagMapping,
    priorityMapping: mappings.priorityMapping,
  }),
  generateAccounts: accounts => fetch(API.generateStatements, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ accounts }),
  }),
  queryUploadStatus: (token, sessionKey) => postJson(API.getUploadStatus, { token, sessionKey }),
};
