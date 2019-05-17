import { css } from 'styled-components'

export const Truncate = () => css`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  min-width: 0;
`

export const InheritLink = () => css`
  text-decoration: none;
  color: inherit;
`
