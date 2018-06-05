/**
 * This module provides a set of components and functions
 * to manage and provide access to the todo List.
 */
import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid/v4';
import _ from 'lodash';
import { loadData, saveData } from './Storage';

const { Provider, Consumer } = React.createContext();

const debouncedSave = _.debounce(saveData, 300);
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
    list: loadData('list')
  };

  saveList = list => {
    this.setState({ list });
    debouncedSave('list', list);
  };

  // Set a new list with the new todo.
  handleAdd = text => {
    const newTodo = { id: uuid(), text, isDone: false };
    const list = [newTodo, ...this.state.list];
    this.saveList(list);
  };

  // Set a new list with the updated todo.
  handleEdit = newItem => {
    const { list } = this.state;
    const index = list.findIndex(item => item.id === newItem.id);
    const item = list[index];
    const newList = [
      ...list.slice(0, index),
      {
        ...item,
        ...newItem
      },
      ...list.slice(index + 1)
    ];
    this.saveList(newList);
  };

  // Set a new list without the removed todo.
  handleRemove = id => {
    const { list } = this.state;
    const index = list.findIndex(item => item.id === id);
    const newList = [...list.slice(0, index), ...list.slice(index + 1)];
    this.saveList(newList);
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
    this.saveList(newList);
  };

  // Set a new list without items done.
  handleClear = () => {
    const { list } = this.state;
    const newList = list.filter(({ isDone }) => !isDone);
    this.saveList(newList);
  };

  // Returns a handler object list to pass inside the provider context
  getHandlers = () => ({
    handleAdd: this.handleAdd,
    handleEdit: this.handleEdit,
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

// Injects the todo add handler.
export function withAdd(Component) {
  return function TodosComponent(props) {
    return (
      <Consumer>
        {({ handleAdd }) => <Component {...props} onSubmit={handleAdd} />}
      </Consumer>
    );
  };
}

// Injects the todo list and its handlers.
export function withTodos(Component) {
  return function TodosComponent(props) {
    return (
      <Consumer>
        {({ list, handleEdit, handleClose, handleRemove, handleClear }) => (
          <Component
            {...props}
            onEditItem={handleEdit}
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
