// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDvSPA9bIIVTV2gkGF4SE_w6okEk01fp8Y",
  authDomain: "crowd-funding-f5d4f.firebaseapp.com",
  projectId: "crowd-funding-f5d4f",
  storageBucket: "crowd-funding-f5d4f.appspot.com",
  messagingSenderId: "777423460805",
  appId: "1:777423460805:web:9955719f57beee891313ac",
  measurementId: "G-MNCMTVQP6F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Set up Google Auth provider
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword };
