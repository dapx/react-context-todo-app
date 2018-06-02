import React from 'react';
import ReactDOM from 'react-dom';
import Option from '../MenuOption';

it('renders without crashing', () => {
  const button = document.createElement('button');
  ReactDOM.render(<Option onClick={() => {}} />, button);
});
