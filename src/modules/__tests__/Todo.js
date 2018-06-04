import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import TodoProvider from '../Todo';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<TodoProvider />, div);
});

it('should create provider context state', () => {
  const wrapper = mount(<TodoProvider />);
  expect(wrapper.state('list')).toEqual([]);
});
