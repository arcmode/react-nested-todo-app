import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import {
  createStore,
  combineReducers,
  compose,
  applyMiddleware
} from 'redux';

import Immutable from 'immutable';

const createEnhancedStore = compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore);

//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
let injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

const initialTodosState = Immutable.fromJS([
  {title: 'hola', todos: []}
]);

const todoReducer = (state = initialTodosState, action) => {
  switch (action.type) {
  case 'TODO_ADD':
    const { parentPath } = action.payload;
    const destinationPath = parentPath.reduce(
      (acc, part) => acc.push(part).push('todos')
      , Immutable.List());
    return state.updateIn(
      destinationPath,
      todos => todos.push(Immutable.fromJS({title: 'title', todos: []})));
    break;
  default:
  }
  return state;
};

const combinedReducer = combineReducers({
  todos: todoReducer,
});

const store = createEnhancedStore(combinedReducer);

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
