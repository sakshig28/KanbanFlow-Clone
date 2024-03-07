// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA2N896DdUSVyaoiDNgmGtDnUYJr1Q8o8U",
  authDomain: "chutes-ladders.firebaseapp.com",
  projectId: "chutes-ladders",
  storageBucket: "chutes-ladders.appspot.com",
  messagingSenderId: "927800576696",
  appId: "1:927800576696:web:aea6f42e2fb0b8608c424d",
  measurementId: "G-CDQW4VFQDT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
