// Kept dependency-free so the Edge middleware can import it without pulling the
// Firebase Admin SDK into the Edge bundle.
export const SESSION_COOKIE = 'portfolio_session';
export const SESSION_MAX_AGE_MS = 60 * 60 * 24 * 5 * 1000; // 5 days
