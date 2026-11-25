import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDaTs-uJVtYG3AnlgchgJtAVLbzOkdYoNQ",
  authDomain: "iwamad-chat-8df27.firebaseapp.com",
  databaseURL:
    "https://iwamad-chat-8df27-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "iwamad-chat-8df27",
  storageBucket: "iwamad-chat-8df27.firebasestorage.app",
  messagingSenderId: "492432673161",
  appId: "1:492432673161:web:cbf0a5f6bcf2213a417958",
};

export const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
