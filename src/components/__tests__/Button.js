import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Button from '../Button';

it('renders without crashing', () => {
  const button = document.createElement('button');
  ReactDOM.render(<Button onClick={() => {}} />, button);
});

it('should be the same as the snapshot', () => {
  const tree = renderer.create(<Button />).toJSON();
  expect(tree).toMatchSnapshot();
});
