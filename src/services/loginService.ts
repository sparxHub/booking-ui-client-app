import firebaseAuthAdapter, { AuthAdapter } from "@/adapters/firebase-auth-adapter";

// You can later replace this with another adapter if needed
const authAdapter: AuthAdapter = firebaseAuthAdapter;

/**
 * Login with Email and Password
 */
export const loginWithEmailPassword = async (email: string, password: string) => {
  return await authAdapter.loginWithEmailPassword(email, password);
};

/**
 * Register with Email and Password
 */
export const registerWithEmailPassword = async (
  email: string,
  password: string,
  displayName: string
) => {
  return await authAdapter.registerWithEmailPassword(email, password, displayName);
};

/**
 * Login with Google
 */
export const loginWithGoogle = async () => {
  return await authAdapter.loginWithGoogle();
};

/**
 * Login with Apple
 */
export const loginWithApple = async () => {
  return await authAdapter.loginWithApple();
};

/**
 * Send Password Reset Email
 */
export const sendPasswordResetEmail = async (email: string) => {
  return await authAdapter.sendPasswordReset(email);
};

/**
 * Logout the current user
 */
export const logout = async () => {
  return await authAdapter.logout();
};

/**
 * Handle Auth State Changes
 */
export const onAuthStateChanged = (callback: (user: any) => void) => {
  authAdapter.onAuthStateChange(callback);
};

/**
 * Get the Current User
 */
export const getCurrentUser = () => {
  return authAdapter.getCurrentUser();
};
