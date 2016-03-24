import React, { Component } from 'react';
import { connect } from 'react-redux';

class App extends Component {

  constructor(props) {
    super(props);
    [
      'renderTodo',
      'addNested',
      'addNew',
    ].forEach(
      method =>
        this[method] = this[method].bind(this));
  }

  addNested(parentPath) {
    this.props.dispatch({
      type: 'TODO_ADD',
      payload: { parentPath }
    });
  }

  addNew() {
    this.props.dispatch({
      type: 'TODO_ADD',
      payload: { parentPath: [] }
    });
  }

  renderTodo(todo, path) {
    return <li key={`todo-${path.join('')}`}>
      <p>
      {todo.get('title')}
        <button onTouchTap={this.addNested.bind(this, path)} >+</button>
      </p>
      <ul>
      {todo.get('todos').map((_todo, _idx) => this.renderTodo(_todo, [...path, _idx]))}
      </ul>
    </li>;
  }

  render() {
    return (
      <ul>
        {this.props.todos.map(
           (todo, x) => this.renderTodo(todo, [x]))}
        <button onTouchTap={this.addNew}>Add new</button>
      </ul>
    );
  }
}

const select = ({todos}) => {
  return {todos};
};

export default connect(select)(App);
