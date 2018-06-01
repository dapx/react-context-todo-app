import React from 'react';
import ReactDOM from 'react-dom';
// import { shallow, mount } from 'enzyme';
import TodoProvider from '../Todo';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<TodoProvider />, div);
});
