import React, { ComponentProps, PureComponent, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Navbar, Container, Nav, NavItem, NavLink } from '@crutch/components'
import cn from 'classnames'
import './Header.scss'
import UserNav from '../user/nav/UserNav'

const displayName = 'Header'

export interface IHeaderProps extends ComponentProps<'nav'> {
}

export class Header extends PureComponent<IHeaderProps> {
  render(): ReactNode {
    const classes = cn(
      displayName
    )

    return (
      <div className={classes}>
        <Container>
          <Navbar size={'basic'}>
            <Link to={'/'} className={`${displayName}-logo`}>
              Waves Items Vault
            </Link>
            <Nav className={`${displayName}-nav`} size={'lg'}>
              <NavItem>
                <NavLink as={Link} to={'/games'}>Games</NavLink>
              </NavItem>
              <NavItem>
                <NavLink as={Link} to={'/items'}>Items</NavLink>
              </NavItem>
              <NavItem>
                <NavLink as={Link} to={'/about'}>About</NavLink>
              </NavItem>
            </Nav>
            <Nav className={`${displayName}-profile`}>
              <NavItem>
                <UserNav/>
              </NavItem>
            </Nav>
          </Navbar>
        </Container>
      </div>
    )
  }
}

export default Header
