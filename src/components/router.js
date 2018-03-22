import React from 'react';
import { Route , BrowserRouter , Switch } from 'react-router-dom';
import App from '../App';
import MainPage from './MainPage';
import SingleEventPage from './SingleEventPage';
import PageNotFound from '../components/PageNotFound';

export default (
  <BrowserRouter>
    <App>
      <Switch>
        <Route exact path="/" component={ MainPage }/>
        <Route exact path="/:id" component={ SingleEventPage }/>
        <Route component={ PageNotFound }/>
      </Switch>
    </App>
  </BrowserRouter>
);

