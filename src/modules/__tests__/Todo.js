import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import TodoProvider from '../Todo';

describe('TodoProvider', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<TodoProvider />, div);
  });

  it('should create provider context state', () => {
    const wrapper = mount(<TodoProvider />);
    expect(wrapper.state('list')).toEqual([]);
  });

  it('should handle add', () => {
    const wrapper = mount(<TodoProvider />);
    expect(wrapper.state('list').length).toBe(0);

    wrapper.instance().handleAdd('teste');
    expect(wrapper.state('list').length).toBe(1);

    const firstItem = wrapper.state('list')[0];
    expect(firstItem.text).toBe('teste');
    expect(firstItem.isDone).toBeFalsy();

    wrapper.instance().handleAdd('teste 2');
    expect(wrapper.state('list').length).toEqual(2);

    // remember - the first index is the last item added
    const secondItem = wrapper.state('list')[0];
    expect(secondItem.text).toBe('teste 2');
    expect(secondItem.isDone).toBeFalsy();
  });

  it('should handle edit', () => {
    const wrapper = mount(<TodoProvider />);
    expect(wrapper.state('list').length).toBe(0);

    wrapper.instance().handleAdd('todo 1');
    wrapper.instance().handleAdd('todo 2');
    wrapper.instance().handleAdd('todo 3');
    expect(wrapper.state('list').length).toBe(3);

    // remember - the first index is the last item added
    const todo2 = wrapper.state('list')[1];
    expect(todo2.text).toBe('todo 2');
    expect(todo2.isDone).toBeFalsy();

    const toUpdate = { id: todo2.id, text: 'todo 2 edited' };
    expect(todo2.id).toBe(toUpdate.id);

    wrapper.instance().handleEdit(toUpdate);
    expect(wrapper.state('list').length).toEqual(3);

    // should not update
    const todo3 = wrapper.state('list')[0];
    expect(todo3.id).toBe(todo3.id);
    expect(todo3.text).toBe('todo 3');
    expect(todo3.isDone).toBeFalsy();

    // should not update
    const todo1 = wrapper.state('list')[2];
    expect(todo1.id).toBe(todo1.id);
    expect(todo1.text).toBe('todo 1');
    expect(todo1.isDone).toBeFalsy();

    // should update
    const updated = wrapper.state('list')[1];
    expect(updated.id).toBe(todo2.id);
    expect(updated.text).toBe('todo 2 edited');
    expect(updated.isDone).toBeFalsy();
  });

  it('should handle close', () => {
    const wrapper = mount(<TodoProvider />);
    expect(wrapper.state('list').length).toEqual(0);

    wrapper.instance().handleAdd('teste');
    expect(wrapper.state('list').length).toEqual(1);
    const toClose = wrapper.state('list')[0];
    expect(toClose.isDone).toBeFalsy();

    wrapper.instance().handleClose(toClose.id);
    expect(wrapper.state('list').length).toEqual(1);

    const completedTodo = wrapper.state('list')[0];
    expect(completedTodo.id).toBe(toClose.id);
    expect(completedTodo.text).toBe(toClose.text);
    expect(completedTodo.isDone).toBeTruthy();
  });

  it('should handle remove', () => {
    const wrapper = mount(<TodoProvider />);
    expect(wrapper.state('list').length).toEqual(0);

    // remember - the first index is the last item added
    wrapper.instance().handleAdd('teste 1'); // list[2]
    wrapper.instance().handleAdd('teste 2'); // list[1]
    wrapper.instance().handleAdd('teste 3'); // list[0]
    expect(wrapper.state('list').length).toEqual(3);

    const toRemove = wrapper.state('list')[1];
    expect(toRemove.text).toBe('teste 2');

    wrapper.instance().handleRemove(toRemove.id);
    expect(wrapper.state('list').length).toEqual(2);
    wrapper
      .state('list')
      .forEach(todo => expect(todo.id).not.toEqual(toRemove.id));

    const toRemove2 = wrapper.state('list')[1];
    expect(toRemove2.text).toBe('teste 1');
    wrapper.instance().handleRemove(toRemove2.id);
    expect(wrapper.state('list').length).toEqual(1);

    const toRemove3 = wrapper.state('list')[0];
    expect(toRemove3.text).toBe('teste 3');
    wrapper.instance().handleRemove(toRemove3.id);
    expect(wrapper.state('list').length).toEqual(0);
  });

  it('should handle clear', () => {
    const wrapper = mount(<TodoProvider />);
    expect(wrapper.state('list').length).toEqual(0);

    wrapper.instance().handleClear();
    expect(wrapper.state('list').length).toEqual(0);

    // remember - the first index is the last item added
    wrapper.instance().handleAdd('todo 1'); // list[5]
    wrapper.instance().handleAdd('todo 2'); // list[4]
    wrapper.instance().handleAdd('todo 3'); // list[3]
    wrapper.instance().handleAdd('todo 4'); // list[2]
    wrapper.instance().handleAdd('todo 5'); // list[1]
    wrapper.instance().handleAdd('todo 6'); // list[0]
    expect(wrapper.state('list').length).toEqual(6);

    wrapper.state('list').forEach(todo => expect(todo.isDone).toBeFalsy());

    const todo2 = wrapper.state('list')[4];
    const todo5 = wrapper.state('list')[1];
    wrapper.instance().handleClose(todo2.id);
    wrapper.instance().handleClose(todo5.id);
    expect(wrapper.state('list').length).toEqual(6);

    const todo2Closed = wrapper.state('list')[4];
    expect(todo2Closed.isDone).toBeTruthy();

    const todo5Closed = wrapper.state('list')[1];
    expect(todo5Closed.isDone).toBeTruthy();

    wrapper.instance().handleClear();
    expect(wrapper.state('list').length).toEqual(4);

    wrapper.state('list').forEach(todo => expect(todo.isDone).toBeFalsy());
  });
});
