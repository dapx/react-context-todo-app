/**
 * This module provides a set of components and functions
 * to manage and provide access to the todo List.
 */
import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid/v4';

const { Provider } = React.createContext();

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
    list: [
      { id: uuid(), text: 'daniel', isDone: false },
      { id: uuid(), text: 'joão', isDone: false }
    ]
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
    const newList = list.filter(({ isDone }) => isDone !== true);
    this.setState({ list: newList });
  };

  // Returns a handler object list to pass in inside the context
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

export default TodoProvider;
