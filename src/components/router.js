import React from 'react';
import { Route , BrowserRouter , Switch } from 'react-router-dom';
import App from '../App';
import Main from '../components/Main';
import Event from '../components/Event';
import PageNotFound from '../components/PageNotFound';

export default (
  <BrowserRouter>
    <App>
      <Switch>
        <Route exact path="/" component={ Main }/>
        <Route exact path="/:id" component={ Event }/>
        <Route exact component={ PageNotFound }/>
      </Switch>
    </App>
  </BrowserRouter>
);

