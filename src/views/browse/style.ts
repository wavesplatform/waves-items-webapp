import styled, { css } from 'styled-components'
import { Box, BoxProps } from 'rebass'
import { themeGet } from 'styled-system'
import { Button } from '../../components/buttons'

export const FiltersContainer = styled(Box)`
`

export const ItemsContainer = styled(Box)`
  display: block;
  position: relative;
`

interface ItemsSideProps extends BoxProps {
  constrain?: boolean
}

export const ItemsSide = styled(Box)<ItemsSideProps>`
  ${props =>
  props.constrain && css`
    width: 50%;
    padding-right: calc(${themeGet('space.lg')}px / 2);
  `}
`

interface ItemSideProps extends BoxProps {
  isActive?: boolean
}

export const ItemSide = styled(Box)<ItemSideProps>`
  position: absolute;
  right: ${props => (props.isActive ? 0 : '-50%')};;
  width: 50%;
  top: 0;
  height: 100%;
  opacity: ${props => (props.isActive ? 1 : 0)};
  padding-left: calc(${themeGet('space.lg')}px / 2); 
`

export const LoadMoreButton = styled(Button).attrs({ size: 'lg' })`
  width: 100%;
  display: block;
`
