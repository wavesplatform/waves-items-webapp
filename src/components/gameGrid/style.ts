import { Grid } from '../layout'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { themeGet } from 'styled-system'

export const GameGridContainer = styled(Grid)`
  grid-gap: ${themeGet('space.lg')}px;
  grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
`

export const GameGridLink = styled(Link)`

`
