import React, { Component, ReactNode } from 'react'
import { IDefaultResult, IItem } from '../../types'
import { ChildProps, graphql } from 'react-apollo'
import { InventoryContainer } from './style'
import { H2 } from '../../components/globals'
import { getUserItemsQuery } from '../../graphql/queries/getUserItems'
import InventoryGrid from '../../components/inventoryGrid'
import { UserItemsQuery } from '../../graphql/queries/__generated__/UserItemsQuery'
import { Loading } from '../../components/loading'

interface IProps {
  address: string
}

interface IData extends UserItemsQuery, IDefaultResult {
}

interface IVariables {
  address: string
}

type TChildProps = ChildProps<IProps, IData, IVariables>

class Inventory extends Component<TChildProps> {
  render(): ReactNode {
    const {} = this.props
    const data = this.props.data as IData
    const { loading, error } = data

    if (loading) {
      return <Loading/>
    }

    const items = (data.userItems || []) as IItem[]

    return (
      <InventoryContainer>
        <InventoryGrid items={items.map(item => (item as IItem)) || []}/>
      </InventoryContainer>
    )
  }
}

const withUserItems = graphql<IProps, IData, IVariables>(getUserItemsQuery, {
  options: props => ({
    fetchPolicy: 'cache-and-network',
    variables: {
      address: props.address,
    },
  }),
})

export default withUserItems(Inventory)
