import { css } from 'styled-components';
import Link from './Link';

const Option = Link.extend`
  display: flex;
  flex: none;
  background-color: white;
  border: 1px solid transparent;
  border-radius: 3px;
  text-decoration: none;
  transition: border-color 0.2s linear;

  ${({ enabled }) =>
    enabled &&
    css`
      border-color: rgba(175, 47, 47, 0.5);
    `};
`;

export default Option;
