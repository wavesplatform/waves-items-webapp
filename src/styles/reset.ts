import { createGlobalStyle } from 'styled-components'
import { fontStack } from '../components/globals'
import { themeGet } from 'styled-system'

export const GlobalStyle = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    outline: none;
    -webkit-appearance: none;
    -moz-appearance: none;
  }
  
  html {
    font-family: sans-serif;
    line-height: ${themeGet('lineHeights.base')};
    height: 100%;
  }
  
  body {
    margin: 0;
    ${fontStack};
    font-size: ${themeGet('fontSizes.base')}px;
    font-weight: ${themeGet('fontWeights.normal')};
    line-height: ${themeGet('lineHeights.base')};
    color: ${themeGet('colors.default')};
    text-align: left;
    background-color: ${themeGet('bg.default')};
    height: 100%;
  }
  
  #root {
    height: 100%;
  }
  
  a {
    color: currentColor;
    text-decoration: none;
  }
  a:hover {
    cursor: pointer;
  }
  
  [tabindex="-1"]:focus:not(:focus-visible) {
    outline: 0 !important;
  }
  
  h1, h2, h3, h4, h5, h6 {
    margin-top: 0;
    margin-bottom: ${themeGet('space.md')}px;
  }
  
  p {
    margin-top: 0
  }
  
  ol,
  ul,
  dl {
    margin-top: 0;
    margin-bottom: 1rem;
  }
  
  ol ol,
  ul ul,
  ol ul,
  ul ol {
    margin-bottom: 0;
  }
  
  b,
  strong {
    font-weight: ${themeGet('fontWeights.bold')};
  }
  
  img {
    vertical-align: middle;
    border-style: none;
  }
  
  svg {
    overflow: hidden;
    vertical-align: middle;
  }
  
  table {
    border-collapse: collapse;
  }
  
  input,
  button,
  select,
  optgroup,
  textarea {
    margin: 0;
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
  }
  
  textarea {
    resize: none;
  }
  
  button,
  input {
    overflow: visible;
  }
  
  button,
  select {
    text-transform: none;
  }
  
  select {
    word-wrap: normal;
  }
  
  [hidden] {
    display: none !important;
  }
  
  // Keyframes
  @keyframes rotate {
    100% {
      -webkit-transform: rotate(360deg);
              transform: rotate(360deg);
    }
  }
  @keyframes dash {
    0% {
      stroke-dasharray: 1, 150;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -35;
    }
    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -124;
    }
  }
`
