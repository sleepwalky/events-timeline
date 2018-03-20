import React from 'react';
import { Route , BrowserRouter , Switch } from 'react-router-dom';
import App from '../App';
import Main from '../components/Main';

export default (
  <BrowserRouter>
    <App>
      <Switch>
        <Route exact path="/" component={ Main }/>
      </Switch>
    </App>
  </BrowserRouter>
);

