import styled from "styled-components";

const SFormBox = styled.div`
  display: block;
  padding-top: 60px;
  margin-bottom: 20px;
`;

function FormBox({ children }) {
  return <SFormBox>{children}</SFormBox>;
}

export default FormBox;
