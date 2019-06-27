import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { themeGet } from 'styled-system'
import { Grid } from '../../components/layout'

export const GamesSliderContainer = styled(Grid)`
  grid-gap: ${themeGet('space.lg')}px;
  grid-template-columns: .24fr .19fr .19fr .19fr .19fr;
  position: relative;
`

export const GameLink = styled(Link)`

`
