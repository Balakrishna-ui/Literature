import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';
import { getStorage } from 'firebase-admin/storage';

const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

if (!getApps().length) {
  if (serviceAccountKey) {
    try {
      const serviceAccount = JSON.parse(serviceAccountKey);
      if (serviceAccount.private_key) {
        serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, '\n');
      }
      initializeApp({
        credential: cert(serviceAccount),
      });
      console.log('Firebase Admin initialized successfully in Next.js.');
    } catch (error) {
      console.error('Error parsing FIREBASE_SERVICE_ACCOUNT_KEY from environment variables.', error);
    }
  } else {
    console.warn('FIREBASE_SERVICE_ACCOUNT_KEY is missing. Firebase Admin will not connect.');
  }
}

export const db = getApps().length ? getFirestore() : null;
export const auth = getApps().length ? getAuth() : null;
export const storage = getApps().length ? getStorage() : null;
