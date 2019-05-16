import { Box, Flex } from 'rebass'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { space, SpaceProps, themeGet } from 'styled-system'

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
  text-decoration: none;
  color: inherit;
  
  &:hover,
  &:focus {
    text-decoration: none;
    color: inherit;
    background: ${themeGet('colors.grays.7')};
  }
  
  ${space}
`

NavLink.defaultProps = {
  p: 'lg',
}

export const Logo = styled(NavLink)`
  margin-right: ${themeGet('space.md')};
  font-weight: ${themeGet('fontWeights.normal')};
`

export const NavProfile = styled(NavItem)`
`
