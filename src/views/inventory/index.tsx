import React, { Component, ReactNode } from 'react'
import { IDefaultResult, IItem } from '../../types'
import { ChildProps, graphql } from 'react-apollo'
import { InventoryContainer } from './style'
import { H2 } from '../../components/globals'
import { getBalanceQuery } from '../../graphql/queries/getBalance'
import { BalanceQuery } from '../../graphql/queries/__generated__/BalanceQuery'
import InventoryGrid from '../../components/inventoryGrid'

interface IProps {
  address: string
}

interface IData extends BalanceQuery, IDefaultResult {
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
      return <div>Loading...</div>
    }
    
    const items = (data.balance || []) as IItem[]

    return (
      <InventoryContainer>
        <H2>Inventory</H2>
        <InventoryGrid items={items.map(item => (item as IItem)) || []}/>
      </InventoryContainer>
    )
  }
}

const withBalance = graphql<IProps, IData, IVariables>(getBalanceQuery, {
  options: props => ({
    fetchPolicy: 'cache-and-network',
    variables: {
      address: props.address,
    },
  }),
})

export default withBalance(Inventory)
