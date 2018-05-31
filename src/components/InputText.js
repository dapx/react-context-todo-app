// @flow
import React from 'react';
import styled from 'styled-components';

// Create an Input component that'll render an <input> tag with some styles
const Input = styled.input`
  padding: 0.5em;
  margin: 0.5em;
  color: palevioletred;
  background: papayawhip;
  border: none;
  border-radius: 3px;
`;

// Defining flow types for the component
type Props = {
  onSubmit: (text: string) => void
};
type State = {
  text: string
};
type Event = {
  key: string,
  target: {
    value: string
  }
};

/**
 * Simple InputText component to submit on press `Enter` key.
 * Receives a bound method on props, called `onSubmit`.
 */
class InputText extends React.PureComponent<Props, State> {
  state = {
    text: ''
  };

  // Submit the input text if has pressed enter.
  handleKeyPress = (e: Event) => {
    if (e.key === 'Enter') {
      const { text } = this.state;
      this.props.onSubmit(text);
      this.setState({ text: '' });
    }
  };

  onChange = (e: Event) => {
    this.setState({ text: e.target.value });
  };

  render() {
    return (
      <Input
        type="text"
        placeholder="What needs to be done?"
        value={this.state.text}
        onKeyDown={this.handleKeyPress}
        onChange={this.onChange}
        autoFocus={true}
      />
    );
  }
}

export default InputText;
