import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Button from '../Button';

describe('Button Component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Button onClick={() => {}} />, div);
  });

  it('should be the same as the snapshot', () => {
    const tree = renderer.create(<Button />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should hide button when hidden prop is true', () => {
    const tree = renderer.create(<Button hidden={true} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
