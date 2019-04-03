import React, { Component, ReactNode } from 'react'
import Item from '../item/Item'
import { IItem } from '../../types'
import styled from 'styled-components'
import { Box } from 'rebass'
import { gridGap, GridGapProps, gridTemplateColumns, GridTemplatesColumnsProps } from 'styled-system'

interface IProps {
  items: IItem[]
}

const StyledItemList = styled(Box)<GridGapProps & GridTemplatesColumnsProps>`
  display: grid;
  
  ${gridGap}
  ${gridTemplateColumns}
`

StyledItemList.defaultProps = {
  gridGap: 2,
  gridTemplateColumns: 'repeat(4, 1fr)',
}

export class ItemList extends Component<IProps> {
  render(): ReactNode {
    const items = this.props.items.map(item => (
      <Item key={item.id} item={item}/>
    ))

    return (
      <StyledItemList>
        {items}
      </StyledItemList>
    )
  }
}

export default ItemList
