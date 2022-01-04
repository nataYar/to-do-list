import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Dashboard from './components/App/Dashboard/Dashboard';
import Signin from './components/Signin/Signin';

const routing = (
  <Router>
    <div>
      <Route exact path='/' component={Signin}/>
      <Route exact path='/dashboard' component={Dashboard}/>
    </div>
  </Router>
)
ReactDOM.render(
  routing,
  document.getElementById('root')
);


