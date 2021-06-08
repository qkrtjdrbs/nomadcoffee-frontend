import styled from "styled-components";

const SFormError = styled.p`
  height: 25px;
  padding: 6px 12px;
  font-size: 20px;
  font-weight: 500;
  text-align: center;
  color: #fff;
  background-color: #ff6060;
`;

function FormError({ message }) {
  return message === "" || !message ? null : <SFormError>{message}</SFormError>;
}

export default FormError;
