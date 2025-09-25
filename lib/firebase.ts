// lib/firebase.ts
import { initializeApp, getApps } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAnalytics } from "firebase/analytics";

// Your config
const firebaseConfig = {
  apiKey: "AIzaSyDdM3iP5JlyUU7QJqA9MVzIvlLpyXAom18",
  authDomain: "react-demo-14-11-2023.firebaseapp.com",
  databaseURL: "https://react-demo-14-11-2023-default-rtdb.firebaseio.com",
  projectId: "react-demo-14-11-2023",
  storageBucket: "react-demo-14-11-2023.firebasestorage.app",
  messagingSenderId: "968466756969",
  appId: "1:968466756969:web:f72efec7d81c5b489fb9f8",
  measurementId: "G-X3PQQM1M5E",
};

// Initialize only once
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
const analytics = typeof window !== "undefined" ? getAnalytics(app) : null;
const database = getDatabase(app);

export { app, analytics, database };
