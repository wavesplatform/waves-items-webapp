import { Grid } from '../layout'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { themeGet } from 'styled-system'
import { Card } from 'rebass'
import { StyledIcon } from '../icon/style'

export const InventoryGridContainer = styled(Grid)`
  grid-gap: ${themeGet('space.lg')}px;
  grid-template-columns: repeat(auto-fill, minmax(8rem, 1fr));
`

export const InventoryGridLink = styled(Link)`
  
`

export const EmptyCard = styled(Card)`
  position: relative;
  display: flex;
  min-width: 0;
  transition: background-color .2s ease-out;
  height: 100%;
  align-items: center;
  justify-content: center;
  color: ${themeGet('colors.grays.5')};
  
  ${StyledIcon} {
    transition: transform .1s ease-out;
  }
  
  &:hover,
  &:focus {
    background-color: ${themeGet('colors.grays.8')};
    color: ${themeGet('colors.grays.2')};
    
    ${StyledIcon} {
      transform: scale(1.05);
    }
  }
  
  // Adaptive height
  &:before {
    content: '';
    display: block;
    padding-top: 100%;
  }
`
EmptyCard.defaultProps = {
  borderRadius: 'base',
  borderStyle: 'solid',
  borderWidth: '3px',
  borderColor: 'grays.8',
}
