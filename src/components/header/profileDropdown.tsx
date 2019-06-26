import React, { Component, ComponentProps, ElementType, ReactNode } from 'react'
import styled from 'styled-components'
import { Box, BoxProps, Flex } from 'rebass'
import { Link } from 'react-router-dom'
import { borders, BordersProps, space, themeGet } from 'styled-system'
import { hexa, inheritLink, shadow, WavesCy } from '../globals'
import { AuthConsumer, IAuthContext } from '../../contexts/auth'
import { IKeeperContext, withKeeperContext } from '../../contexts/keeper'
import { toWavesFromKeeper } from '../../helpers/order'

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
  ${inheritLink};
  ${space};
  
  &:hover,
  &:focus {
    ${inheritLink};
    
    background-color: ${themeGet('bg.dropdownHover')};
  }
`
DropdownLink.defaultProps = { py: 'base', px: 'lg' }

const Balance = styled(Box)`
  display: block;
  cursor: default;
`
Balance.defaultProps = { py: 'base', px: 'lg' }

interface IProps {
  isShown?: boolean
  target?: any
  onClickOutside?: () => void
}

class ProfileDropdown extends Component<IProps & IKeeperContext> {
  componentWillMount(): void {
    document.addEventListener('click', this._onClickOutside)
  }

  componentWillUnmount(): void {
    document.removeEventListener('click', this._onClickOutside)
  }

  render(): ReactNode {
    const { isShown, publicState } = this.props
    const { account } = publicState

    return (
      <AuthConsumer>
        {({ signOut }: IAuthContext) => (
          <DropdownContainer isShown={isShown}>
            <DropdownList>
              {account && <DropdownItem borderBottom={'1px solid'}>
                <Balance>{toWavesFromKeeper(account.balance.available).toFixed(3)} <WavesCy/></Balance>
              </DropdownItem>}
              <DropdownItem>
                <DropdownLink as={Link} to={'/profile'}>Profile</DropdownLink>
              </DropdownItem>
              <DropdownItem>
                <DropdownLink onClick={signOut}>Logout</DropdownLink>
              </DropdownItem>
            </DropdownList>
          </DropdownContainer>
        )}
      </AuthConsumer>
    )
  }

  _onClickOutside = (ev: MouseEvent) => {
    const { onClickOutside, isShown, target } = this.props

    if (target && isShown && !target.contains(ev.target) && onClickOutside) {
      onClickOutside()
    }
  }
}

export default withKeeperContext<IProps>(ProfileDropdown)
