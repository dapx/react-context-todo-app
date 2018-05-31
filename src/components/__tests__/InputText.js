import React from 'react';
import ReactDOM from 'react-dom';
import InputText from '../InputText';

it('renders without crashing', () => {
  const input = document.createElement('input');
  ReactDOM.render(<InputText />, input);
});
