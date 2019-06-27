import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { themeGet } from 'styled-system'
import { TableCell, TableRow, truncate } from '../globals'

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

export const ItemTableRow = styled(TableRow)`
  cursor: default;
  
  &:hover {
    background: ${themeGet('colors.grays.7')};
  }
`

export const ItemTableCell = styled(TableCell)`
`
ItemTableCell.defaultProps = {
  ...ItemTableCell.defaultProps,
  px: 'md',
  py: 'md',
}
