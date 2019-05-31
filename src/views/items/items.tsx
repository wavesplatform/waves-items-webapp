import React, { Component, ReactNode } from 'react'
import { IDefaultResult, IItem } from '../../types'
import { ChildProps, graphql } from 'react-apollo'
import { getItemsQuery } from '../../graphql/queries/getItems'
import { ItemsQuery } from '../../graphql/queries/__generated__/ItemsQuery'
import ItemGrid from '../../components/itemGrid'
import { ItemsContainer, ItemSide, ItemsSide } from './style'
import { ItemFilter } from '../../../__generated__/globalTypes'
import { Item } from './index'
import { StickyContainer, Sticky } from 'react-sticky'
import { Box } from 'rebass'
import theme from '../../styles/theme'

interface IProps {
  address?: string
}

interface IData extends ItemsQuery, IDefaultResult {
}

interface IVariables {
  filter?: ItemFilter
  // offset: number
  // limit: number
}

type TChildProps = ChildProps<IProps, IData, IVariables>

class Items extends Component<TChildProps> {
  state = {
    selectedAssetId: '',
  }

  componentDidUpdate(prevProps: Readonly<TChildProps>, prevState: Readonly<{}>, snapshot?: any): void {
    if (this.props.address !== prevProps.address) {
      this.selectAssetId('')
    }
  }

  selectAssetId = (assetId: string): void => {
    this.setState({
      selectedAssetId: assetId,
    })
  }

  render(): ReactNode {
    const data = this.props.data as IData
    const { loading, error } = data
    const assetId = this.state.selectedAssetId

    if (loading) {
      return <div>Loading...</div>
    }
    const items = data.items as IItem[]
    const stickyOffset = theme.header.height + theme.space.lg

    return (
      <ItemsContainer as={StickyContainer}>
        <ItemsSide constrain={!!assetId}>
          <ItemGrid items={items || []} selectItem={this.selectAssetId}/>
        </ItemsSide>
        <ItemSide isActive={!!assetId}>
          {assetId && <Sticky topOffset={-stickyOffset}>
            {({ style, isSticky, distanceFromTop }) => (
              <Box style={{ ...style, top: stickyOffset }}><Item assetId={assetId}/></Box>
            )}
          </Sticky>}
        </ItemSide>
      </ItemsContainer>
    )
  }
}

const withItems = graphql<IProps, IData, IVariables>(getItemsQuery, {
  options: props => ({
    fetchPolicy: 'cache-and-network',
    variables: {
      filter: {
        gameAddress: props.address,
      },
    },
  }),
})

export default withItems(Items)
