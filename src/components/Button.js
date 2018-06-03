import { css } from 'styled-components';
import Link from './Link';

const Button = Link.withComponent('button').extend`
  transition: visibility .4s linear, opacity .4s linear;

  &:focus {
    outline: 0;
    border:1px solid rgba(175,47,47,0.15);
    box-shadow: 0 0 10px #e6e6e6;
  }

  ${({ hidden }) =>
    hidden &&
    css`
      opacity: 0;
      visibility: hidden;
    `}
`;

export default Button;
