import { initializeApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBoQtJaTEx-VxFS4k66JoKtYMVWvQRXL-Q",
  authDomain: "ai-hub-6765c.firebaseapp.com",
  projectId: "ai-hub-6765c",
  storageBucket: "ai-hub-6765c.firebasestorage.app",
  messagingSenderId: "844984042701",
  appId: "1:844984042701:web:27a420dd17908e60fb5584"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();