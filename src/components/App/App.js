import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Error404 from '../Error404/Error404';
import Header from '../Header/Header';
import Organizations from '../Organizations/Organizations';

const App = () => (

  <div className="App">
    <BrowserRouter>
    <Header/>
    <Switch>
      <Route exact path="/" render={(props) => <Organizations {...props}/>} />
      <Route component={ Error404 } />
    </Switch>
    </BrowserRouter>
  </div>

);

export default App;
