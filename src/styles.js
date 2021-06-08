import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const lightTheme = {
  accent: "#0095f6",
  bgColor: "#FFFFFF",
  btnColor: "#17191d",
  borderColor: "rgb(219, 219, 219)",
  fontColor: "rgb(38, 38, 38)",
};

export const darkTheme = {
  fontColor: "white",
  bgColor: "#2c2c2c",
  btnColor: "#C4C4C4",
};

export const GlobalStyles = createGlobalStyle`
    ${reset}
    body {
      a {
        text-decoration: none;
        color: ${(props) => props.theme.accent};
      }
    }
`;
