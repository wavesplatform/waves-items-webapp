import { Component, ComponentProps, ElementType, ReactNode } from 'react'
import React from 'react'
import styled from 'styled-components'
import { Box, BoxProps, Flex, FlexProps } from 'rebass'
import { Link } from 'react-router-dom'
import { space, themeGet } from 'styled-system'
import { inheritLink } from '../globals'
import { AuthConsumer, IAuthContext } from '../../contexts/auth'

interface DropdownContainerProps extends BoxProps {
  isShown?: boolean
}

const DropdownContainer = styled(Box)<DropdownContainerProps>`
  position: absolute;
  z-index: 99;
  width: 168px;
  right: 0;
  
  display: ${props => (props.isShown ? 'block' : 'none')};
`

const DropdownList = styled(Flex)`
  flex-direction: column;
  justify-content: center;
  list-style: none;
  background: ${themeGet('bg.dropdown')};
  padding: 0;
  margin: 0;
  color: ${themeGet('bg.default')};
`
DropdownList.defaultProps = { as: 'ul' }

const DropdownItem = styled(Box)`
  color: ${themeGet('bg.default')};
  border-bottom: 1px solid ${themeGet('bg.dropdownHover')};
  
  &:last-child {
    border-bottom: none;
  }
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
            <DropdownList fontSize={'sm'}>
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
