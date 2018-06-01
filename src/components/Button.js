import styled, { css } from 'styled-components';

const Button = styled.button`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: white;
  border-radius: 3px;
  padding: 10px;
  margin: 10px;

  ${({ enabled }) =>
    enabled &&
    css`
      background-color: #ddd;
    `};
`;

export default Button;
