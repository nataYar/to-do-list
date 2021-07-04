import firebase from "firebase/app";
import 'firebase/auth';
// import app from 'firebase/app';
import 'firebase/firebase-firestore';

// Required for side-effects
require('firebase/database');
require('firebase/storage');

const firebaseConfig = {
  apiKey: "AIzaSyCQmrtblKBtLC5ZX7BOK7fFEqdpkUAa7cw",
  authDomain: "todolist-beb72.firebaseapp.com",
  projectId: "todolist-beb72",
  storageBucket: "todolist-beb72.appspot.com",
  messagingSenderId: "696086738032",
  appId: "1:696086738032:web:206ce49bf7f8b7f7ab70b5",
  measurementId: "G-3FE6ZEVXCS"
}

firebase.initializeApp(firebaseConfig);

export default firebase;

