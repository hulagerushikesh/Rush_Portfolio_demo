import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const APP_NAME = 'portfolio-client';

// Client Firebase is used for exactly one thing: signing the admin in so we can
// trade the resulting ID token for an httpOnly session cookie. No Firestore or
// Storage access happens from the browser — security rules deny it outright.
export function clientAuth() {
  const app = getApps().some((a) => a.name === APP_NAME)
    ? getApp(APP_NAME)
    : initializeApp(
        {
          apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
          authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
          projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
        },
        APP_NAME
      );

  return getAuth(app);
}
