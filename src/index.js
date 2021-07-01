import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import firebase from "firebase/app";
import App from './Components/App/App';

// Required for side-effects
require('firebase/firestore');
require('firebase/auth');
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


const routing = (
  <Router>
    <div>
      {/* <Route exact path='/register' component={Register}/>
      <Route exact path='/login' component={Login}/> */}
      <Route exact path='/app' component={App}/>
    </div>
  </Router>
)
ReactDOM.render(
  routing,
  document.getElementById('root')
);


