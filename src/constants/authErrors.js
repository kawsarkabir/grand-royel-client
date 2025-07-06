export const AUTH_ERROR_MESSAGES = {
  'auth/user-not-found': 'No account found with this email.',
  'auth/wrong-password': 'Incorrect password.',
  'auth/invalid-email': 'Invalid email address.',
  'auth/user-disabled': 'This account has been disabled.',
  'auth/too-many-requests': 'Too many failed attempts. Please try again later.',
  'auth/network-request-failed': 'Network error. Please check your connection.',
  'auth/email-already-in-use': 'An account with this email already exists.',
  'auth/weak-password': 'Password should be at least 6 characters.',
  'auth/operation-not-allowed': 'This operation is not allowed.',
  'auth/invalid-credential': 'Invalid email or password.',
  'auth/popup-closed-by-user': 'Sign-in was cancelled.',
  'auth/popup-blocked':
    'Pop-up was blocked. Please allow pop-ups and try again.',
  default: 'An unexpected error occurred. Please try again.',
};

export const getAuthErrorMessage = (error) => {
  return AUTH_ERROR_MESSAGES[error.code] || AUTH_ERROR_MESSAGES.default;
};
