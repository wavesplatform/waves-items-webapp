import React from 'react'
import { IItem } from '../../types'
import { Table, TableBody, TableHeader, TableRow } from '../globals'
import { ItemRow } from './components/itemRow'
import { ItemTableCell, ItemTableRow } from './style'

interface IItemTableProps {
  items: IItem[]
}

export const ItemTable = (props: IItemTableProps) => {
  const list = props.items.map((item, index) => (
    <ItemRow item={item} key={index}/>
  ))

  return (
    <Table width={1}>
      <TableHeader>
        <TableRow>
          <ItemTableCell>Item</ItemTableCell>
          <ItemTableCell>Quantity</ItemTableCell>
          <ItemTableCell>Misc</ItemTableCell>
          <ItemTableCell>AssetId</ItemTableCell>
          <ItemTableCell>Timestamp</ItemTableCell>
          <ItemTableCell/>
        </TableRow>
      </TableHeader>
      <TableBody>{list}</TableBody>
    </Table>
  )
}

export default ItemTable
