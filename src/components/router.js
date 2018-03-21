import React from 'react';
import { Route , BrowserRouter , Switch } from 'react-router-dom';
import App from '../App';
import Main from '../components/Main';

export default (
  <BrowserRouter>
    <App>
      <Switch>
        <Route exact path="/" component={ Main }/>
        <Route exact path="/:id" render={ () => {
          return (
            <h1>Hello from event profile</h1>
          );
        } }/>
        <Route render={ () => {
          return (
            <h1>Page not found</h1>
          );
        } }/>

      </Switch>
    </App>
  </BrowserRouter>
);

