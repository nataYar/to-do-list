import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Dashboard from './components/App/Dashboard';
import Login from './components/Login/login';
import Register from './components/Register/register';
// import { AuthContext, AuthProvider } from './Auth';

const routing = (

  <Router>
    <div>
      <Route exact path='/register' component={Register}/>
      <Route exact path='/login' component={Login}/>
      <Route exact path='/dashboard' component={Dashboard}/>
    </div>
  </Router>
)
ReactDOM.render(
  routing,
  document.getElementById('root')
);


