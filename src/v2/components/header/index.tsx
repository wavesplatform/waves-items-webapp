import React, { Component, ReactNode } from 'react'
import { AuthConsumer, IAuthContext } from '../../contexts/auth'
import { Nav, Navbar, NavItem, NavLink, NavProfile, Logo } from './style'
import { Container } from '../layout'

export interface IProps {
}

class Header extends Component<IProps> {
  render(): ReactNode {

    return (
      <AuthConsumer>
        {({ user, signOut }: IAuthContext) => (
          <Container>
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
                <NavProfile/>
              </Nav>
            </Navbar>
          </Container>
        )}
      </AuthConsumer>
    )
  }
}

export default Header
