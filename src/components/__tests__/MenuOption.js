import React from 'react';
import ReactDOM from 'react-dom';
import Option from '../MenuOption';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Option onClick={() => {}} />, div);
});
