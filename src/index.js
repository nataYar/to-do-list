import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Dashboard from './components/App/Dashboard';
import Signin from './components/Signin/Signin';
import Register from './components/Register/register';

const routing = (
  <Router>
    <div>
      <Route exact path='/register' component={Register}/>
      <Route exact path='/' component={Signin}/>
      <Route exact path='/dashboard' component={Dashboard}/>
    </div>
  </Router>
)
ReactDOM.render(
  routing,
  document.getElementById('root')
);


