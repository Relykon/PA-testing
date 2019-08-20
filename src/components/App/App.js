import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Error404 from '../Error404/Error404';
import Header from '../Header/Header';
import Organizations from '../Organizations/Organizations';

const App = () => (

  <div className="App">
    <Header/>
    <Switch>
      <Route exact path="/" component={ Organizations } />
      <Route component={ Error404 } />
    </Switch>
  </div>

);

export default App;
