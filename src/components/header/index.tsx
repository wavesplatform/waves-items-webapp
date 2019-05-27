import React, { Component, createRef, ReactNode } from 'react'
import { AuthConsumer, IAuthContext } from '../../contexts/auth'
import {
  Nav,
  Navbar,
  NavItem,
  NavLink,
  NavProfile,
  Logo,
  ProfileToggle,
  ProfileDrop,
  NavbarContainer,
  NavbarWrapper
} from './style'
import { UserAvatar } from '../image'
import { Box } from 'rebass'
import ProfileDropdown from './profileDropdown'

interface IProps {
}

interface IState {
  profileDropdownIsShown?: boolean
}

class Header extends Component<IProps> {
  state: IState = {
    profileDropdownIsShown: false,
  }

  profileDropRef = createRef()

  render(): ReactNode {
    return (
      <AuthConsumer>
        {({ user, signOut }: IAuthContext) => (
          <NavbarWrapper>
            <Navbar>
              <NavbarContainer>
                {/*Logo*/}
                <Logo to={'/'}>
                  Waves Vault
                </Logo>
                {/*Menu*/}
                <Nav>
                  <NavItem>
                    <NavLink to={'/items'}>Items</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink to={'/about'}>About</NavLink>
                  </NavItem>
                </Nav>
                {/*Profile*/}
                <Nav>
                  <NavProfile>
                    {user ? (
                      <ProfileDrop ref={this.profileDropRef}>
                        <ProfileToggle
                          onClick={this._onProfileDropdownToggle}
                          isActive={this.state.profileDropdownIsShown}
                        >
                          {user.name || user.address}
                          <Box ml={'md'}>
                            <UserAvatar user={user} size={'sm'}/>
                          </Box>
                        </ProfileToggle>
                        <ProfileDropdown
                          isShown={this.state.profileDropdownIsShown}
                          target={this.profileDropRef.current}
                          onClickOutside={this._onProfileDropdownClickOutside}
                        />
                      </ProfileDrop>
                    ) : (
                      <NavLink to={'/signin'}>
                        Sign In
                      </NavLink>
                    )}
                  </NavProfile>
                </Nav>
              </NavbarContainer>
            </Navbar>
          </NavbarWrapper>
        )}
      </AuthConsumer>
    )
  }

  _onProfileDropdownToggle = () => {
    this.setState({
      profileDropdownIsShown: !this.state.profileDropdownIsShown,
    })
  }

  _onProfileDropdownClickOutside = () => {
    this.setState({
      profileDropdownIsShown: false,
    })
  }
}

export default Header
