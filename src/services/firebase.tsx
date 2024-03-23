import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { getAuth } from "firebase/auth";
import { getStorage, ref, uploadBytes } from "firebase/storage";

const firebaseConfig = {
  // apiKey: "AIzaSyD9X-f3IAx-JRgeobDBRtMKRUdTqvZnC0A",
  // authDomain: "codrive-fec10.appspot.com",
  // projectId: "codrive-fec10",
  // messagingSenderId: "874102047441",
  // appId: "1:874102047441:android:1494b77a8ccab9b3f83bf0",
  // measurementId: "G-CF4FDKC63F",
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_BUCKET_URL,
};

// Initialize Firebase

firebase.initializeApp(firebaseConfig);
console.log("firebase initialized");

const auth = getAuth();

export const firestore = firebase.firestore();
export default firebase;
export const storage = getStorage();
