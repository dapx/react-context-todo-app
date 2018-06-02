import { css } from 'styled-components';
import Button from './Button';

const Option = Button.extend`
  display: flex;
  flex: none;
  background-color: white;
  border: 1px solid transparent;
  border-radius: 3px;
  transition: border-color 0.2s linear;

  ${({ enabled }) =>
    enabled &&
    css`
      border-color: rgba(175, 47, 47, 0.5);
    `};
`;

export default Option;
