import styled, { css } from 'styled-components'
import { Box, BoxProps, Flex } from 'rebass'
import { themeGet } from 'styled-system'

export const ListContainer = styled(Flex)`
  flex-direction: column;
`

interface ListItemContainerProps extends BoxProps {
  border?: boolean
  active?: boolean
}

const HoverFocus = () => css`
  &:hover,
  &:focus {
    z-index: 1;
    text-decoration: none;
    background-color: ${themeGet('colors.grays.8')};
    color: inherit;
  }
`

export const ListItemContainer = styled(Box)<ListItemContainerProps>`
  margin-bottom: -1px;
  border-top: 1px solid
    ${props => (props.border ? themeGet('colors.grays.7') : 'transparent')};
  border-bottom: 1px solid
    ${props => (props.border ? themeGet('colors.grays.7') : 'transparent')};
  color: inherit;
  text-decoration: none;
  list-style: none;
  
  &:first-child {
    border-top: none;
  }

  &:last-child {
    margin-bottom: 0;
  }
  
  ${props => (props.active ? HoverFocus() : '')};
`

ListItemContainer.defaultProps = {
  p: 'lg',
}
