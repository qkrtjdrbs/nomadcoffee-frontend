import styled from "styled-components";

export const Input = styled.input`
  width: 100%;
  box-sizing: border-box;
  height: 56px;
  margin-bottom: 15px;
  padding: 18px 12px;
  border: 1px solid #e5e8eb;
  background-color: #fff;
  font-size: 12px;
  outline: 0;
  &::placeholder {
    font-size: 15px;
    color: gray;
  }
  &:focus {
    border-color: ${(props) =>
      props.hasError ? "tomato" : props.theme.accent};
  }
  &:focus::placeholder {
    color: transparent;
  }
`;
