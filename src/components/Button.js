import styled from 'styled-components';

const Button = styled.button`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  color: #bfbfbf;
  background-color: white;
  padding: 5px;
  margin: 5px;
  font-size: 12px;
  font-weight: 300;

  &:focus {
    outline: 0;
  }
`;

export default Button;
