import { Box, BoxProps } from 'rebass'
import styled, { css } from 'styled-components'
import { themeGet } from 'styled-system'

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
    padding-right: calc(${themeGet('space.md')}px / 2);
  `}
`

interface ItemSideProps extends BoxProps {
  isActive?: boolean
}

export const ItemSide = styled(Box)<ItemSideProps>`
  background: ${themeGet('bg.default')};
  position: absolute;
  right: ${props => (props.isActive ? 0 : '-50%')};;
  width: 50%;
  top: 0;
  height: 100%;
  opacity: ${props => (props.isActive ? 1 : 0)};
  padding-left: calc(${themeGet('space.md')}px / 2); 
`
