import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCQmrtblKBtLC5ZX7BOK7fFEqdpkUAa7cw",
    authDomain: "todolist-beb72.firebaseapp.com",
    projectId: "todolist-beb72",
    storageBucket: "todolist-beb72.appspot.com",
    messagingSenderId: "696086738032",
    appId: "1:696086738032:web:206ce49bf7f8b7f7ab70b5",
    measurementId: "G-3FE6ZEVXCS"
  };

firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase;