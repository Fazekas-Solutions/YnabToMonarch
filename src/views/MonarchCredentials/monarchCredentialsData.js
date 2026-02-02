import { v4 as uuidv4 } from 'uuid';
import { monarchApi } from '../../api/monarchApi.js';
import { encryptPassword } from '../../../shared/crypto.js';
import state from '../../state.js';

/**
 * Initialize credentials from storage based on STORAGE_STRATEGY:
 * - sessionStorage: temporary, cleared on tab close
 * - localStorage: persistent, encrypted, user-opted-in with "remember me"
 */
export function initCredentials() {
  // Try to load persisted credentials from localStorage (if user chose "remember me")
  const persistedEmail = localStorage.getItem('monarch_email_persisted');
  const persistedEncrypted = localStorage.getItem('monarch_pwd_enc_persisted');
  const persistedRemember = localStorage.getItem('monarch_remember') === 'true';
  
  // Try to load session credentials from sessionStorage (temporary)
  const sessionEmail = sessionStorage.getItem('monarch_email');
  const sessionEncrypted = sessionStorage.getItem('monarch_pwd_enc');
  const sessionToken = sessionStorage.getItem('monarch_token');
  const sessionUuid = sessionStorage.getItem('monarch_uuid');
  
  // Prioritize persisted credentials if available, otherwise use session credentials
  const email = persistedEmail || sessionEmail;
  const encryptedPassword = persistedEncrypted || sessionEncrypted;
  const token = sessionToken;
  const uuid = sessionUuid;
  const isRemembered = persistedRemember;
  
  // Update state with loaded credentials
  state.monarchCredentials.email = email;
  state.monarchCredentials.encryptedPassword = encryptedPassword;
  state.monarchCredentials.accessToken = token;
  state.monarchCredentials.uuid = uuid;
  state.monarchCredentials.remember = isRemembered;

  // Ensure deviceUuid is always set
  if (!state.monarchCredentials.uuid || state.monarchCredentials.uuid === '') {
    state.monarchCredentials.uuid = uuidv4();
    sessionStorage.setItem('monarch_uuid', state.monarchCredentials.uuid);
  }

  return { creds: state.monarchCredentials };
}

/**
 * Attempt login and handle credential storage based on user's "remember me" choice.
 * STORAGE_STRATEGY:
 * - If "remember me" is unchecked: store temporarily in sessionStorage (cleared on tab close)
 * - If "remember me" is checked: store encrypted in localStorage (persistent)
 */
export async function attemptLogin({ emailInput, passwordInput, creds, rememberChecked }) {
  const email = emailInput.trim();
  const plaintextPassword = passwordInput.trim();
  let encryptedPassword = creds.encryptedPassword;
  const uuid = creds.uuid;

  if (!encryptedPassword && plaintextPassword) {
    try {
      encryptedPassword = await encryptPassword(email, plaintextPassword);
    } catch (err) {
      return { error: 'Failed to encrypt password.' };
    }
  }

  try {
    const response = await monarchApi.login(email, encryptedPassword, uuid);

    if (response?.otpRequired) {
      // Store temporarily for OTP verification
      storeCredentialsTemporarily(email, encryptedPassword);
      state.monarchCredentials.otp = null; // awaiting OTP
      return { otpRequired: true };
    }

    if (response?.token) {
      state.monarchCredentials.email = email;
      state.monarchCredentials.encryptedPassword = encryptedPassword;
      state.monarchCredentials.accessToken = response.token;
      state.monarchCredentials.remember = rememberChecked;
      state.monarchCredentials.otp = '';

      // Store credentials based on user preference
      if (rememberChecked) {
        storeCredentialsPersistently(email, encryptedPassword);
      } else {
        storeCredentialsTemporarily(email, encryptedPassword);
      }

      return { token: response.token };
    }

    const apiError = response?.detail || response?.error || 'Unexpected login response.';
    return { error: apiError };
  } catch (err) {
    return { error: err.message || String(err) };
  }
}

/**
 * Store credentials in sessionStorage (temporary, cleared on tab close).
 * Per STORAGE_STRATEGY section 3.
 */
function storeCredentialsTemporarily(email, encryptedPassword) {
  sessionStorage.setItem('monarch_email', email);
  sessionStorage.setItem('monarch_pwd_enc', encryptedPassword);
  // Clear any persisted credentials
  localStorage.removeItem('monarch_email_persisted');
  localStorage.removeItem('monarch_pwd_enc_persisted');
  localStorage.removeItem('monarch_remember');
}

/**
 * Store credentials in localStorage (persistent, encrypted, user-opted-in).
 * Per STORAGE_STRATEGY section 4.
 */
function storeCredentialsPersistently(email, encryptedPassword) {
  localStorage.setItem('monarch_email_persisted', email);
  localStorage.setItem('monarch_pwd_enc_persisted', encryptedPassword);
  localStorage.setItem('monarch_remember', 'true');
  // Also populate sessionStorage for current session
  sessionStorage.setItem('monarch_email', email);
  sessionStorage.setItem('monarch_pwd_enc', encryptedPassword);
}

/**
 * Clear all stored credentials (both session and persistent).
 * Per STORAGE_STRATEGY: user explicitly chose to "Not You?" to clear saved data.
 */
export function clearCredentialsAndReset() {
  // Clear sessionStorage credentials
  sessionStorage.removeItem('monarch_email');
  sessionStorage.removeItem('monarch_pwd_enc');
  sessionStorage.removeItem('monarch_token');
  
  // Clear localStorage persisted credentials
  localStorage.removeItem('monarch_email_persisted');
  localStorage.removeItem('monarch_pwd_enc_persisted');
  localStorage.removeItem('monarch_remember');
  
  // Reset state
  state.monarchCredentials.email = null;
  state.monarchCredentials.encryptedPassword = null;
  state.monarchCredentials.accessToken = null;
  state.monarchCredentials.otp = null;
  state.monarchCredentials.remember = false;
  
  // Generate new device UUID
  state.monarchCredentials.uuid = uuidv4();
  sessionStorage.setItem('monarch_uuid', state.monarchCredentials.uuid);
}
