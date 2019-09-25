import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import * as serviceWorker from './serviceWorker';
import { HashRouter as Router } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux'; // creates the "store" but using Redux, applyMiddleware is the bridge to action db
import rootReducer from './redux/reducer'; // "updates" the "store" to update "state"
import { Provider } from 'react-redux'; // provider to inject
import AppStore from './AppStore';
import thunk from 'redux-thunk'; // bridge the actions
import { cloudant } from './data/config';

// applyMiddleware - creates connection between db actions and actions
const store = createStore(rootReducer, applyMiddleware(thunk));

// we replaced App with AppStore since AppStore connectts "App" and "store" in redux
ReactDOM.render(
  <Provider store={store}>
    <Router>
      {' '}
      <AppStore />
    </Router>
  </Provider>,
  document.getElementById('root')
);
/*
ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
); */

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
