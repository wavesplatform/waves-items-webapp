import { Box, Flex } from 'rebass'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { space, SpaceProps, themeGet } from 'styled-system'
import { InheritLink } from '../globals'

export const Navbar = styled(Flex)`
  position: relative;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  background: ${themeGet('colors.grays.8')};
`

export const Nav = styled(Flex)`
  flex-wrap: wrap;
  padding-left: 0;
  margin-bottom: 0;
  list-style: none;
`

export const NavItem = styled(Box)`
`

export const NavLink = styled(Link)<SpaceProps>`
  display: block;
  ${InheritLink};
  
  &:hover,
  &:focus {
    ${InheritLink};
    background: ${themeGet('colors.grays.7')};
  }
  
  ${space}
`

NavLink.defaultProps = {
  p: 'md',
}

export const Logo = styled(NavLink)`
  margin-right: ${themeGet('space.md')}px;
  font-weight: ${themeGet('fontWeights.normal')};
`

export const NavProfile = styled(NavItem)`
`
