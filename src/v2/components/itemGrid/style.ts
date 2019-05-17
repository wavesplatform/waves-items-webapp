import { Grid } from '../layout'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { themeGet } from 'styled-system'
import { InheritLink } from '../globals'

export const ItemGridContainer = styled(Grid)`
  grid-gap: ${themeGet('space.md')}px;
  grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
`

export const ItemGridLink = styled(Link)`
  ${InheritLink};
  
  &:hover,
  &:focus {
    ${InheritLink};
  }
`
