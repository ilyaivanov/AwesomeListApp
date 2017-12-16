import * as React from 'react';
import {combineReducers, createStore} from 'redux';
import {Provider} from 'react-redux';
import Root, {nav} from './navigation/Root';

const store = createStore(combineReducers({nav}));

//class-based container to make hot-reloading working
export default class App extends React.Component {
  render() {
    return <Provider store={store}>
      <Root/>
    </Provider>;
  }
};
