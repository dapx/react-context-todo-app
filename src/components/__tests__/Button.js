import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Button from '../Button';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Button onClick={() => {}} />, div);
});

it('should be the same as the snapshot', () => {
  const tree = renderer.create(<Button />).toJSON();
  expect(tree).toMatchSnapshot();
});
