import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import ListItem from '../ListItem';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ListItem onClick={() => {}} />, div);
});

it('should be the same as the snapshot', () => {
  const tree = renderer.create(<ListItem />).toJSON();
  expect(tree).toMatchSnapshot();
});
