// @flow
import React from 'react';
import styled from 'styled-components';

const Input = styled.input`
  flex: 1;
  padding: 0.5em;
  margin: 0.5em;
  border: none;
  border-radius: 3px;
  font-size: 24px;

  &::placeholder {
    font-style: italic;
    font-weight: 300;
    color: #e6e6e6;
  }

  &:focus {
    outline: 0;
    border:1px solid rgba(175,47,47,0.15);
    box-shadow: 0 0 10px #e6e6e6;
  }
`;

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
  handleKeyPress = (evt: Event) => {
    if (evt.key === 'Enter') {
      const { text } = this.state;
      this.props.onSubmit(text);
      this.setState({ text: '' });
    }
  };

  onChange = (evt: Event) => {
    this.setState({ text: evt.target.value });
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
