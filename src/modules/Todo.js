/**
 * This module provides a set of components and functions
 * to manage and provide access to the todo List.
 */
import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid/v4';

const { Provider, Consumer } = React.createContext();

/**
 * A component that stores a global state and
 * provides methods to change its state.
 *
 * It receives a children component that can
 * implements a Consumer component at any depth level
 * of component tree to access its state.
 */
class TodoProvider extends React.PureComponent {
  state = {
    list: []
  };

  // Set a new list with the new todo.
  handleSubmit = text => {
    const newTodo = { id: uuid(), text, done: false };
    const list = [newTodo, ...this.state.list];
    this.setState({ list });
  };

  // Set a new list without the removed todo.
  handleRemove = id => {
    const { list } = this.state;
    const index = list.findIndex(item => item.id === id);
    const newList = [...list.slice(0, index), ...list.slice(index + 1)];
    this.setState({ list: newList });
  };

  // Set a new list with a new item done.
  handleClose = id => {
    const { list } = this.state;
    const index = list.findIndex(item => item.id === id);
    const item = list[index];
    const newList = [
      ...list.slice(0, index),
      {
        ...item,
        isDone: !item.isDone
      },
      ...list.slice(index + 1)
    ];
    this.setState({ list: newList });
  };

  // Set a new list without items done.
  handleClear = () => {
    const { list } = this.state;
    const newList = list.filter(({ isDone }) => !isDone);
    this.setState({ list: newList });
  };

  // Returns a handler object list to pass inside the provider context
  getHandlers = () => ({
    handleSubmit: this.handleSubmit,
    handleClose: this.handleClose,
    handleRemove: this.handleRemove,
    handleClear: this.handleClear
  });

  render() {
    const context = {
      ...this.getHandlers(),
      ...this.state
    };
    return <Provider value={context}>{this.props.children}</Provider>;
  }
}

TodoProvider.propTypes = {
  children: PropTypes.node
};

// Injects the todo clear handler into onPress
export function withClearTodos(Component) {
  return function TodosComponent(props) {
    return (
      <Consumer>
        {({ handleClear }) => <Component {...props} onClear={handleClear} />}
      </Consumer>
    );
  };
}

// Injects the todo submit handler.
export function withAddTodo(Component) {
  return function TodosComponent(props) {
    return (
      <Consumer>
        {({ handleSubmit }) => <Component {...props} onSubmit={handleSubmit} />}
      </Consumer>
    );
  };
}

// Injects the todo list and its handlers.
export function withTodos(Component) {
  return function TodosComponent(props) {
    return (
      <Consumer>
        {({ list, handleClose, handleRemove, handleClear }) => (
          <Component
            {...props}
            onCloseItem={handleClose}
            onRemoveItem={handleRemove}
            onClear={handleClear}
            list={list}
          />
        )}
      </Consumer>
    );
  };
}

export default TodoProvider;
