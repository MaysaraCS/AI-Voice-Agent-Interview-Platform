import { initializeApp, getApps, cert, App } from "firebase-admin/app";
import { getAuth, Auth } from "firebase-admin/auth";
import { getFirestore, Firestore } from "firebase-admin/firestore";

let app: App | undefined;
let authInstance: Auth | undefined;
let dbInstance: Firestore | undefined;

function initFirebaseAdmin() {
  // Check if already initialized
  if (app && authInstance && dbInstance) {
    return { auth: authInstance, db: dbInstance };
  }

  const apps = getApps();

  if (!apps.length) {
    try {
      // Ensure environment variables exist
      if (!process.env.FIREBASE_PROJECT_ID || 
          !process.env.FIREBASE_CLIENT_EMAIL || 
          !process.env.FIREBASE_PRIVATE_KEY) {
        throw new Error("Missing Firebase environment variables");
      }

      app = initializeApp({
        credential: cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
        }),
      });
    } catch (error) {
      console.error("Failed to initialize Firebase Admin:", error);
      throw error;
    }
  } else {
    app = apps[0];
  }

  authInstance = getAuth(app);
  dbInstance = getFirestore(app);

  return { auth: authInstance, db: dbInstance };
}

export const { auth, db } = initFirebaseAdmin();