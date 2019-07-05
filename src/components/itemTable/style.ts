import styled from 'styled-components'
import { themeGet } from 'styled-system'
import { TableCell, TableRow, truncate } from '../globals'
import { Box, Link } from 'rebass'
import { Link as RouterLink } from 'react-router-dom'

export const AssetIdLink = styled(Link)`
  color: ${themeGet('colors.link')};
  max-width: 300px;
  display: block;
  
  ${truncate};
  
  &:hover,
  &:focus {
    color: ${themeGet('colors.linkHover')};
  }
`

export const EditLink = styled(RouterLink)`
  color: ${themeGet('colors.link')};
  max-width: 300px;
  display: block;
  
  ${truncate};
  
  &:hover,
  &:focus {
    color: ${themeGet('colors.linkHover')};
  }
`

export const ItemTableRow = styled(TableRow)`
  cursor: default;
  
  &:hover {
    //background: ${themeGet('colors.grays.8')};
    opacity: .8;
  }
`

export const ItemTableCell = styled(TableCell)`
`
ItemTableCell.defaultProps = {
  ...ItemTableCell.defaultProps,
  px: 'md',
  py: 'md',
}

export const ItemMisc = styled(Box)`
  max-width: 160px;
  
  ${truncate};
`
