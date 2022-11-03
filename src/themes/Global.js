import {createGlobalStyle} from "styled-components";

export const GlobalStyle = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: "Open Sans", sans-serif;
    font-size: 16px;
  }

  a {
    color: inherit;
    cursor: pointer;
    text-decoration: none;
  }

  button {
    border-width: 0;
    color: inherit;
    cursor: pointer;
    padding: 0;
  }

  input {
    &::-moz-focus-inner {
      border: 0;
      margin: 0;
      padding: 0;
    }
  }

  ul,
  ol {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  p {
    margin: 0;
  }

  fieldset {
    border-width: 0;
    margin: 0;
    padding: 0;
  }

  /* For images to not be able to exceed their container */
  img {
    max-width: 100%;
  }

  pre {
    white-space: pre-wrap;
  }

  /* Removes spacing between cells in tables */
  table {
    border-collapse: collapse;
  }

  /* Revert the 'white-space' property for textarea elements on Safari */
  textarea {
    white-space: revert;
  }
`;
