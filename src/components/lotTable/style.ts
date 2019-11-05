import styled from 'styled-components'
import { Badge, TableCell, TableRow, truncate } from '../globals'
import { Text } from 'rebass'

export const LotId = styled(Text)`
  max-width: 300px;
  display: block;
  
  ${truncate};
`

export const LotTableRow = styled(TableRow)`
  cursor: default;
  
  &:hover {
    opacity: .8;
  }
`

export const LotTableCell = styled(TableCell)`
`
LotTableCell.defaultProps = {
  ...LotTableCell.defaultProps,
  px: 'md',
  py: 'md',
}

export const Status = styled(Badge)`
  text-transform: uppercase;
`
