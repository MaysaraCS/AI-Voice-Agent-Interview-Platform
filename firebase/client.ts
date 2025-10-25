import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBWih0_U2-TvK4Bixo41kHWOXdjVsJYnMc",
  authDomain: "prepwise-2787e.firebaseapp.com",
  projectId: "prepwise-2787e",
  storageBucket: "prepwise-2787e.firebasestorage.app",
  messagingSenderId: "42492881219",
  appId: "1:42492881219:web:de877520881a823a41a7f6",
  measurementId: "G-WRTN8LVGPF"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
// const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);