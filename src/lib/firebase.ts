// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  setDoc,
  collection,
  getDocs,
  query,
} from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { randomUUID } from "crypto";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDS8BlfL8Ckx5tzoHQpyAjTsJIPWljt16w",
  authDomain: "bate-ponto-database.firebaseapp.com",
  projectId: "bate-ponto-database",
  storageBucket: "bate-ponto-database.appspot.com",
  messagingSenderId: "108725558541",
  appId: "1:108725558541:web:3499872618e7790150a444",
  measurementId: "G-8KSSEHYQPV",
};

// Initialize Firebase
let app = initializeApp(firebaseConfig);
let db = getFirestore();

const initializeFirebase = () => {
  app = initializeApp(firebaseConfig);
  db = getFirestore();
};

export { app, db, initializeFirebase };
