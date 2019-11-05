import React, { Component, ReactNode } from 'react'
import { IDefaultResult, IItem } from '../../types'
import { ChildProps, graphql } from 'react-apollo'
import { InventoryContainer } from './style'
import { getUserItemsQuery } from '../../graphql/queries/getUserItems'
import { UserItemsQuery } from '../../graphql/queries/__generated__/UserItemsQuery'
import { Loading } from '../../components/loading'
import ItemTable from '../../components/itemTable'
import { Button } from '../../components/buttons'
import OrderModal from '../../components/modals/orderModal'

interface IProps {
  address: string
}

interface IData extends UserItemsQuery, IDefaultResult {
}

interface IVariables {
  address: string
}

type TChildProps = ChildProps<IProps, IData, IVariables>

type TState = {
  itemForSale?: IItem
}

class Inventory extends Component<TChildProps> {
  state: TState = {
  }

  render(): ReactNode {
    const {} = this.props
    const data = this.props.data as IData
    const { loading, error } = data

    if (loading) {
      return <Loading/>
    }

    const items = (data.userItems || []) as IItem[]

    const itemActions = (item: IItem) => (
        <Button size={'sm'} onClick={() => {
          this.setState({
            itemForSale: item as IItem,
          })
        }}>Sell</Button>
    )

    return (
      <InventoryContainer>
        <ItemTable items={items} itemActions={itemActions}/>
        {this.state.itemForSale && <OrderModal
          item={this.state.itemForSale}
          type={'sell'}
          show={!!this.state.itemForSale}
          setShow={() => { this.setState({ itemForSale: null }) }}
        />}
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
