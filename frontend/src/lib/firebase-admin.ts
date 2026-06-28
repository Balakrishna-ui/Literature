import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';
import { getStorage } from 'firebase-admin/storage';

export const initFirebase = () => {
  if (getApps().length > 0) {
    return getApps()[0];
  }

  let serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
  
  if (!serviceAccountKey) {
    console.error('FIREBASE_SERVICE_ACCOUNT_KEY is missing from environment variables.');
    throw new Error('FIREBASE_SERVICE_ACCOUNT_KEY is missing');
  }

  try {
    // Strip accidental leading/trailing single quotes (common copy/paste error in Vercel UI)
    if (serviceAccountKey.startsWith("'") && serviceAccountKey.endsWith("'")) {
      serviceAccountKey = serviceAccountKey.slice(1, -1);
    }
    
    const serviceAccount = JSON.parse(serviceAccountKey);
    if (serviceAccount.private_key) {
      serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, '\n');
    }
    
    const app = initializeApp({
      credential: cert(serviceAccount),
    });
    
    console.log('Firebase Admin initialized successfully in Next.js.');
    return app;
  } catch (error) {
    console.error('Failed to parse FIREBASE_SERVICE_ACCOUNT_KEY or initialize Firebase.', error);
    throw new Error('Firebase Admin initialization failed. Check environment variables.');
  }
};

export const getFirebaseDb = () => {
  initFirebase();
  return getFirestore();
};

export const getFirebaseAuth = () => {
  initFirebase();
  return getAuth();
};

export const getFirebaseStorage = () => {
  initFirebase();
  return getStorage();
};
