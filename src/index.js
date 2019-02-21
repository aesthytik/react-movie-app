import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import './index.css';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise';
import reducers from './reducers';

const storeWithMiddleware = applyMiddleware(promiseMiddleware)(createStore);

ReactDOM.render(
  <Provider store={storeWithMiddleware(reducers)}>
    <App />
  </Provider>,
  document.getElementById('root')
);
