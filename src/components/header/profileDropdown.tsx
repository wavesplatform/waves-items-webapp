import { Component, ComponentProps, ElementType, ReactNode } from 'react'
import React from 'react'
import styled from 'styled-components'
import { Box, BoxProps, Flex, FlexProps } from 'rebass'
import { Link } from 'react-router-dom'
import { space, themeGet } from 'styled-system'
import { hexa, inheritLink, shadow } from '../globals'
import { AuthConsumer, IAuthContext } from '../../contexts/auth'

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
  p: 0,
}

const DropdownItem = styled(Box)`
  border-top: 1px solid ${themeGet('colors.grays.7')};
`
DropdownItem.defaultProps = { as: 'li' }

const DropdownLink = styled(Flex)<FlexProps & ComponentProps<ElementType>>`
  cursor: pointer;
  ${inheritLink};
  ${space};
  
  &:hover,
  &:focus {
    ${inheritLink};
    
    background-color: ${themeGet('bg.dropdownHover')};
  }
`
DropdownLink.defaultProps = { p: 'lg' }

interface IProps {
  isShown?: boolean
  target?: any
  onClickOutside?: () => void
}

class ProfileDropdown extends Component<IProps> {
  componentWillMount(): void {
    document.addEventListener('click', this._onClickOutside)
  }

  componentWillUnmount(): void {
    document.removeEventListener('click', this._onClickOutside)
  }

  render(): ReactNode {
    const { isShown } = this.props

    return (
      <AuthConsumer>
        {({ signOut }: IAuthContext) => (
          <DropdownContainer isShown={isShown}>
            <DropdownList>
              <DropdownItem>
                <DropdownLink as={Link} to={'/profile'}>My Profile</DropdownLink>
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

export default ProfileDropdown
