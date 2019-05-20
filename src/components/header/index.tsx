import React, { Component, ReactNode } from 'react'
import { AuthConsumer, IAuthContext } from '../../contexts/auth'
import { Nav, Navbar, NavItem, NavLink, NavProfile, Logo, ProfileLink } from './style'
import { Link } from 'react-router-dom'
import { UserAvatar } from '../image'
import { Box } from 'rebass'

export interface IProps {
}

class Header extends Component<IProps> {
  render(): ReactNode {

    return (
      <AuthConsumer>
        {({ user, signOut }: IAuthContext) => (
          <Navbar>
            {/*Logo*/}
            <Logo to={'/'}>
              Waves Vault
            </Logo>
            <Nav>
              <NavItem>
                <NavLink to={'/games'}>Games</NavLink>
              </NavItem>
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
                  <ProfileLink
                    as={Link}
                    to={'/'}
                  >
                    {user.name || user.address}
                    <Box ml={'md'}>
                      <UserAvatar user={user} size={'sm'}/>
                    </Box>
                  </ProfileLink>
                ) : (
                  <NavLink to={'/signin'}>
                    Sign In
                  </NavLink>
                )}
              </NavProfile>
            </Nav>
          </Navbar>
        )}
      </AuthConsumer>
    )
  }
}

export default Header
