import React, { Component, ComponentProps, ElementType, ReactNode } from 'react'
import styled from 'styled-components'
import { Box, BoxProps, Flex } from 'rebass'
import { Link, RouteComponentProps, withRouter } from 'react-router-dom'
import { borders, BordersProps, space, themeGet } from 'styled-system'
import { hexa, shadow } from '../globals'
import { IKeeperContext, withKeeperContext } from '../../contexts/keeper'
import { toWaves } from '../../helpers/order'
import { compose, withApollo, WithApolloClient } from 'react-apollo'
import authHelper from '../../helpers/auth'
import withCurrentUser, { WithCurrentUserProps } from '../withCurrentUser'
import { WavesCy } from '../globals/currencies'
import TagManager from 'react-gtm-module'

interface DropdownContainerProps extends BoxProps {
  isShown?: boolean
}

const DropdownContainer = styled(Box)<DropdownContainerProps>`
  position: absolute;
  z-index: 99;
  width: 192px;
  right: 0;
  
  display: ${props => (props.isShown ? 'block' : 'none')};
`
DropdownContainer.defaultProps = { py: 0 }

const DropdownList = styled(Flex)`
  flex-direction: column;
  justify-content: center;
  list-style: none;
  background: ${themeGet('bg.dropdown')};
  border: 1px solid ${themeGet('colors.grays.7')};
  border-top: 0;
  overflow: hidden;
  margin: 0;
  box-shadow: ${shadow.mid} ${props => (hexa(themeGet('bg.default')(props), 0.5))};
`
DropdownList.defaultProps = {
  as: 'ul',
  pt: 0,
  pb: 'base',
  px: 0,
}

const DropdownItem = styled(Box)<BoxProps & BordersProps>`
  // border-top: 1px solid ${themeGet('colors.grays.7')};
  ${borders};
`
DropdownItem.defaultProps = { as: 'li', borderColor: 'grays.7' }

const DropdownLink = styled(Box)<BoxProps & ComponentProps<ElementType>>`
  display: block;
  cursor: pointer;
  ${space};
  
  &:hover,
  &:focus {
    background-color: ${themeGet('bg.dropdownHover')};
  }
`
DropdownLink.defaultProps = { py: 'base', px: 'lg' }

const Balance = styled(Box)`
  display: block;
  cursor: default;
`
Balance.defaultProps = { py: 'base', px: 'lg' }

type TProps = RouteComponentProps & WithCurrentUserProps<{
  isShown?: boolean
  target?: any
  onClickOutside?: () => void
}>

class ProfileDropdown extends Component<WithApolloClient<TProps> & IKeeperContext> {
  componentWillMount(): void {
    document.addEventListener('click', this._onClickOutside)
  }

  componentWillUnmount(): void {
    document.removeEventListener('click', this._onClickOutside)
  }

  render(): ReactNode {
    const { isShown, publicState, me, client } = this.props
    const { account } = publicState

    return (
      <DropdownContainer isShown={isShown}>
        <DropdownList>
          {account && <DropdownItem borderBottom={'1px solid'}>
            <Balance>{toWaves(account.balance.available).toFixed(3)} <WavesCy/></Balance>
          </DropdownItem>}
          <DropdownItem>
            <DropdownLink as={Link} to={'/profile'}>Inventory</DropdownLink>
          </DropdownItem>
          <DropdownItem>
            <DropdownLink as={Link} to={'/dashboard'}>Dashboard</DropdownLink>
          </DropdownItem>
          <DropdownItem>
            <DropdownLink onClick={async () => {
              authHelper.removeToken()
              TagManager.dataLayer({ dataLayer: { userId: null, event: 'signoutsuccess' } })
              client.resetStore()
              client.cache.reset()
            }}>Logout</DropdownLink>
          </DropdownItem>
        </DropdownList>
      </DropdownContainer>
    )
  }

  _onClickOutside = (ev: MouseEvent) => {
    const { onClickOutside, isShown, target } = this.props

    if (target && isShown && !target.contains(ev.target) && onClickOutside) {
      onClickOutside()
    }
  }
}

export default compose(withRouter, withKeeperContext, withApollo, withCurrentUser)(ProfileDropdown)
