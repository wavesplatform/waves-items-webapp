import React from 'react'
import { IItem } from '../../../types'
import { UserHeading } from '../../user/userHeading'
import { AssetIdLink, ItemTableCell, ItemTableRow } from '../style'

type TProps = {
  item: IItem
}

export const ItemRow = (props: TProps) => {
  const { item } = props

  return (
    <ItemTableRow>
      <ItemTableCell>
        {item.name}
      </ItemTableCell>
      <ItemTableCell>{item.quantity}</ItemTableCell>
      <ItemTableCell><UserHeading user={item.game} size={'sm'}/></ItemTableCell>
      <ItemTableCell>
        <AssetIdLink
          to={`/item/${item.assetId}`}
        >
          {item.assetId}
        </AssetIdLink>
      </ItemTableCell>
      <ItemTableCell>{item.timestamp}</ItemTableCell>
      <ItemTableCell>
        <AssetIdLink
          to={`/dashboard/item/${item.assetId}`}
        >
          Edit
        </AssetIdLink>
      </ItemTableCell>
    </ItemTableRow>
  )
}
