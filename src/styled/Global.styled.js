import { createGlobalStyle } from "styled-components";
import Theme from "./Theme";
const GlobalStyle = createGlobalStyle`

*,
*::befor,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

img {
  object-fit: cover;
}

body {
    * {
    margin: 0;
    padding: 0;
    box-sizing: border-box
    }

    background-color: ${Theme.color.primaryBg};
    color: ${Theme.color.fonst};

`;

export default GlobalStyle;
