"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeFirebase = exports.db = exports.app = void 0;
// Import the functions you need from the SDKs you need
const app_1 = require("firebase/app");
const firestore_1 = require("firebase/firestore");
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
let app = (0, app_1.initializeApp)(firebaseConfig);
exports.app = app;
let db = (0, firestore_1.getFirestore)();
exports.db = db;
const initializeFirebase = () => {
    exports.app = app = (0, app_1.initializeApp)(firebaseConfig);
    exports.db = db = (0, firestore_1.getFirestore)();
};
exports.initializeFirebase = initializeFirebase;
