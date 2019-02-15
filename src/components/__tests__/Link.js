import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import Link from '../Link';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Link onClick={() => {}} />, div);
});

it('should be the same as the snapshot', () => {
  const tree = renderer.create(<Link />).toJSON();
  expect(tree).toMatchSnapshot();
});
