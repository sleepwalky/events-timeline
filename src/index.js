import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import store from './store';
import router from './containers/router';

ReactDOM.render(
  <Provider store={store}>
    {router}
  </Provider>,
  document.getElementById('root'),
);

registerServiceWorker();
