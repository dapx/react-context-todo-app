// @flow
import React from 'react';
import styled, { css } from 'styled-components';
import Button from './Button';
import AcceptIcon from '../accept-icon.png';
import type { Todo, Event } from '../flowtypes';

export const InputText = styled.input`
  display: flex;
  flex: 1;
  font-size: 24px;
  word-wrap: break-word;
  word-break: break-word;
  border: none;
  border-radius: 3px;
  font-size: 24px;
  padding: 10px;

  &:focus {
    outline: 0;
    border: 1px solid rgba(175, 47, 47, 0.15);
    box-shadow: 0 0 10px #e6e6e6;
  }
`;

export const Text = styled.span`
  display: flex;
  flex: 8;
  flex-wrap: nowrap;
  padding: 10px;
  transition: color 0.3s linear 0.2s;
  font-size: 24px;
  word-wrap: break-word;
  word-break: break-word;
  border: 1px dashed transparent;

  &:hover {
    border-color: rgba(175, 47, 47, 0.5);
  }

  ${({ checked }) =>
    checked &&
    css`
      text-decoration: line-through;
      color: #ddd;
      transition: all 0.3s linear;
    `};
`;

export const Item = styled.li`
  display: flex;
  flex: 1;
  flex-wrap: wrap;
  overflow: hidden;
  flex-direction: row;
  list-style: none;
  border-bottom: 1px solid #ddd;
  align-items: center;

  &:last-child {
    border-bottom: 0;
  }
`;

export const CheckBox = Button.extend`
  display: flex;
  flex: 1;
  background-color: white;
  margin: 0.5em;
  min-width: 40px;
  min-height: 40px;
  max-width: 40px;
  max-height: 40px;
  border-radius: 100%;
  background-size: 0%;
  background-image: url(${AcceptIcon});
  background-repeat: no-repeat;
  background-position: center;
  transition: background-size 0.4s cubic-bezier(0.06, 1.74, 0.65, -1.14),
    background-color 0.4s ease 0.2s;

  ${({ checked }) =>
    checked &&
    css`
      background-color: rgba(175, 47, 47, 0.5);
      background-size: 50%;
      transition: background-size 0.4s cubic-bezier(0.6, -1, 0.7, 2),
        background-color 0.4s ease;
    `};
`;

export const RemoveButton = Button.extend`
  display: flex;
  flex: 1;
  justify-content: center;
  min-width: 10px;
  max-width: 10px;
  margin: 0.5em;
  background-color: transparent;
  border: 0;
  font-size: 24px;
  font-weight: 300;
  color: transparent;
  transition: all 0.2s linear;

  ${Item}:hover & {
    color: #cc9a9a;
    transition: all 0.2s linear;
  }

  ${Item}:hover &:hover {
    color: #af5b5e;
  }
`;

type State = {
  text: string,
  isEditing: boolean
};

type Props = {
  id: string,
  text: string,
  onEdit: (item: Todo) => void,
  onClose: (index: string) => void,
  onRemove: (index: string) => void,
  checked: boolean
};

/**
 * Represents an Item Component from a List Component.
 */
class ListItem extends React.PureComponent<Props, State> {
  state = {
    text: this.props.text,
    isEditing: false
  };

  // Submit the input text if has pressed enter.
  handleKeyPress = (evt: Event) => {
    if (evt.key === 'Enter') {
      const { text } = this.state;
      const { id, onEdit, checked } = this.props;

      onEdit({ id, text, isDone: checked });
      this.handleBlur();
    } else if (evt.key === 'Escape') {
      const { text } = this.props;

      this.setState({ text });
      this.handleBlur();
    }
  };

  onBlur = () => {
    const { text } = this.state;
    const { id, onEdit, checked } = this.props;

    onEdit({ id, text, isDone: checked });
    this.handleBlur();
  };

  handleChange = (evt: Event) => this.setState({ text: evt.target.value });
  handleDoubleClick = () => this.setState({ isEditing: true });
  handleBlur = () => this.setState({ isEditing: false });

  onClose = () => {
    const { id, onClose } = this.props;
    onClose(id);
  };

  onRemove = () => {
    const { id, onRemove } = this.props;
    onRemove(id);
  };

  render() {
    const { checked } = this.props;
    const { isEditing, text } = this.state;
    if (isEditing) {
      return (
        <Item onBlur={this.onBlur}>
          <InputText
            onKeyDown={this.handleKeyPress}
            onChange={this.handleChange}
            value={text}
            autoFocus={true}
          />
        </Item>
      );
    }
    return (
      <Item>
        <CheckBox onClick={this.onClose} checked={checked} />
        <Text onDoubleClick={this.handleDoubleClick} checked={checked}>
          {text}
        </Text>
        <RemoveButton onClick={this.onRemove}>{'X'}</RemoveButton>
      </Item>
    );
  }
}

export default ListItem;
