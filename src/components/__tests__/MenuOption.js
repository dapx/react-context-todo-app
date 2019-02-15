import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import Option from '../MenuOption';

describe('MenuOption Component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Option onClick={() => {}} />, div);
  });

  describe('should be', () => {
    it('enabled', () => {
      const tree = renderer.create(<Option enabled={true} />).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('disabled', () => {
      const tree = renderer.create(<Option enabled={false} />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
