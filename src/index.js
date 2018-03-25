import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
//import the store
import store from './store/store';
//import router
import router from './components/router';

ReactDOM.render(
  <Provider store={ store }>
    { router }
  </Provider> ,
  document.getElementById( 'root' ) );

registerServiceWorker();
