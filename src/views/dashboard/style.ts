import styled from 'styled-components'
import { Box } from 'rebass'
import { Button } from '../../components/buttons'

export const FiltersContainer = styled(Box)`
`

export const ItemsContainer = styled(Box)`
  display: block;
  position: relative;
`

export const LoadMoreButton = styled(Button).attrs({ size: 'lg' })`
  width: 100%;
  display: block;
`
