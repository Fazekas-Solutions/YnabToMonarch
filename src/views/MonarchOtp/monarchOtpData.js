import { v4 as uuidv4 } from 'uuid';
import { monarchApi } from '../../api/monarchApi.js';
import state from '../../state.js';

/**
 * Initialize credentials from storage for OTP verification.
 * Follows same pattern as credentials page - loads from sessionStorage (temporary session).
 */
export function initCredentialsFromStorage() {
  // Load session credentials from sessionStorage
  const email = sessionStorage.getItem('monarch_email');
  const encryptedPassword = sessionStorage.getItem('monarch_pwd_enc');
  const uuid = sessionStorage.getItem('monarch_uuid');

  // Update state with loaded credentials
  state.monarchCredentials.email = email;
  state.monarchCredentials.encryptedPassword = encryptedPassword;
  state.monarchCredentials.uuid = uuid;

  // Ensure deviceUuid is always set
  if (!state.monarchCredentials.uuid || state.monarchCredentials.uuid === '') {
    state.monarchCredentials.uuid = uuidv4();
    sessionStorage.setItem('monarch_uuid', state.monarchCredentials.uuid);
  }

  return { creds: state.monarchCredentials };
}

/**
 * Submit OTP for verification and update state with token.
 * Stores token in sessionStorage for current session.
 */
export async function submitOtp(credentials) {
  const response = await monarchApi.login(
    credentials.email,
    credentials.encryptedPassword,
    credentials.uuid,
    credentials.otp
  );

  if (response?.token) {
    state.monarchCredentials.accessToken = response.token;

    // Store token in sessionStorage (cleared on tab close)
    sessionStorage.setItem('monarch_token', response.token);

    return { success: true };
  }

  return { success: false };
}

/**
 * Clear temporary credentials from sessionStorage (called when user navigates back).
 * Per STORAGE_STRATEGY: OTP was temporary for this session.
 */
export function clearTempCredentialsIfNeeded() {
  sessionStorage.removeItem('monarch_email');
  sessionStorage.removeItem('monarch_pwd_enc');
  sessionStorage.removeItem('monarch_uuid');
  sessionStorage.removeItem('monarch_token');
  
  state.monarchCredentials.email = null;
  state.monarchCredentials.encryptedPassword = null;
  state.monarchCredentials.uuid = uuidv4();
  state.monarchCredentials.otp = null;
  sessionStorage.setItem('monarch_uuid', state.monarchCredentials.uuid);
}
