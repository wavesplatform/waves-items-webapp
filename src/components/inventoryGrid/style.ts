import { Grid } from '../layout'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { themeGet } from 'styled-system'
import { inheritLink } from '../globals'

export const InventoryGridContainer = styled(Grid)`
  grid-gap: ${themeGet('space.lg')}px;
  grid-template-columns: repeat(auto-fill, minmax(8rem, 1fr));
`

export const InventoryGridLink = styled(Link)`
  ${inheritLink};
  
  &:hover,
  &:focus {
    ${inheritLink};
  }
`
