// @flow
import React from 'react';
import styled, { css } from 'styled-components';
import AcceptIcon from '../accept-icon.png';

const Text = styled.span`
  display: flex;
  flex: 8;
  flex-wrap: nowrap;
  padding: 10px;
  transition: color 0.3s linear 0.2s;
  font-size: 24px;
  overflow: scroll;

  ${({ checked }) =>
    checked &&
    css`
      text-decoration: line-through;
      color: #ddd;
      transition: all 0.3s linear;
    `};
`;

const Item = styled.li`
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

const CheckBox = styled.button`
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

const RemoveButton = styled.button`
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

type Props = {
  text: string,
  id: string,
  onClose: (index: string) => void,
  onRemove: (index: string) => void,
  checked: boolean
};

/**
 * Represents an Item Component from a List Component.
 */
class ListItem extends React.PureComponent<Props> {
  onClose = () => {
    const { id, onClose } = this.props;
    onClose(id);
  };

  onRemove = () => {
    const { id, onRemove } = this.props;
    onRemove(id);
  };

  render() {
    const { text, checked } = this.props;
    return (
      <Item>
        <CheckBox onClick={this.onClose} checked={checked} />
        <Text checked={checked}>{text}</Text>
        <RemoveButton onClick={this.onRemove}>{'X'}</RemoveButton>
      </Item>
    );
  }
}

export default ListItem;
