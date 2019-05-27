import { createGlobalStyle } from 'styled-components'
import { fontStack } from '../components/globals'
import { themeGet } from 'styled-system'

export const GlobalStyle = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    outline: none;
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
`
