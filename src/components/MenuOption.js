import styled, { css } from 'styled-components';

const Option = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  border: 0;
  color: #bfbfbf;
  border-radius: 3px;
  padding: 5px;
  margin: 5px;

  &:focus {
    outline: 0;
  }

  ${({ enabled }) =>
    enabled &&
    css`
      border: 1px solid rgba(175, 47, 47, 0.5);
    `};
`;

export default Option;
