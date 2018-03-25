import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import App from '../containers/App';
import Main from './Main';
import SingleEvent from './EventProfile';
import PageNotFound from '../components/PageNotFound';

export default (
  <BrowserRouter>
    <App>
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/:id" component={SingleEvent} />
        <Route component={PageNotFound} />
      </Switch>
    </App>
  </BrowserRouter>
);
