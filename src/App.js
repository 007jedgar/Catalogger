import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import ReduxThunk from 'redux-thunk';
import Router from './Router';
import AppStatusBar from './AppStatusBar';
import logger from 'redux-logger'


export default class App extends Component {
  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk, logger))
    return (
      <Provider store={store}>
        <AppStatusBar backgroundColor="#243238" barStyle="light-content"/>
        <Router />          
      </Provider>
    )
  }
}