import Link from './Link';

const Button = Link.withComponent('button').extend`
  &:focus {
    outline: 0;
    border:1px solid rgba(175,47,47,0.15);
    box-shadow: 0 0 10px #e6e6e6;
  }
`;

export default Button;
