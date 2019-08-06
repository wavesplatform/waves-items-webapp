import React from 'react'
import { IItem, WithBalance } from '../../types'
import { ItemCard } from '../itemCard'
import { EmptyCard, InventoryGridContainer, InventoryGridLink } from './style'
import { Icon } from '../icon'

interface IInventoryGridProps {
  items: WithBalance<IItem>[]
  selectItem?: (assetId: string) => void
}

export const InventoryGrid = (props: IInventoryGridProps) => {
  const { selectItem } = props

  const items = props.items.map(item => (
    <InventoryGridLink
      onClick={ev => {
        if (selectItem) {
          ev.stopPropagation()
          ev.preventDefault()
          selectItem(item.assetId)
        }
      }}
      to={`/item/${item.assetId}`}
      key={item.id}
    >
      <ItemCard item={item} style={'short'}/>
    </InventoryGridLink>
  ))

  return (
    <InventoryGridContainer>
      {items}
      <InventoryGridLink
        to={'/items'}
      >
        <EmptyCard><Icon glyph={'add'} fontSize={'2.4rem'}/></EmptyCard>
      </InventoryGridLink>
    </InventoryGridContainer>
  )
}

export default InventoryGrid
