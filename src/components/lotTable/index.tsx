import React from 'react'
import { ItemLot } from '../../types'
import { Table, TableBody, TableHeader, TableRow } from '../globals'
import { LotRow } from './components/lotRow'
import { LotTableCell } from './style'

type TProps = {
  lots: ItemLot[]
}

export const LotTable = (props: TProps) => {
  const list = props.lots.map((lot, index) => (
    <LotRow lot={lot} key={index}/>
  ))

  return (
    <Table width={1}>
      <TableHeader>
        <TableRow>
          <LotTableCell>Item</LotTableCell>
          <LotTableCell>LotId</LotTableCell>
          <LotTableCell>Stock</LotTableCell>
          <LotTableCell>Price</LotTableCell>
          <LotTableCell>PriceAsset</LotTableCell>
          <LotTableCell>Status</LotTableCell>
          <LotTableCell/>
        </TableRow>
      </TableHeader>
      <TableBody>{list}</TableBody>
    </Table>
  )
}

export default LotTable
