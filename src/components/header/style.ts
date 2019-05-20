import { Box, Flex } from 'rebass'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { space, SpaceProps, themeGet } from 'styled-system'
import { inheritLink } from '../globals'

export const Navbar = styled(Flex)`
  position: relative;
  flex-wrap: wrap;
  align-items: stretch;
  justify-content: space-between;
  background: ${themeGet('colors.grays.8')};
`

export const Nav = styled(Flex)`
  flex-wrap: wrap;
  padding-left: 0;
  margin-bottom: 0;
  list-style: none;
`
Nav.defaultProps = { as: 'ul' }

export const NavItem = styled(Box)`
`
NavItem.defaultProps = { as: 'li' }

export const NavLink = styled(Link)<SpaceProps>`
  display: block;
  ${inheritLink};
  
  &:hover,
  &:focus {
    ${inheritLink};
    background: ${themeGet('colors.grays.7')};
  }
  
  ${space}
`
NavLink.defaultProps = { p: 'md' }

export const Logo = styled(NavLink)`
  margin-right: ${themeGet('space.md')}px;
  font-weight: ${themeGet('fontWeights.normal')};
`

export const NavProfile = styled(NavItem)`

`

export const ProfileLink = styled(NavLink)`
  display: flex;
  align-items: center;
  padding-top: 0;
  padding-bottom: 0;
  height: 100%;
`

