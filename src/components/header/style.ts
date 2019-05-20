import { Box, BoxProps, Flex } from 'rebass'
import styled, { css } from 'styled-components'
import { Link } from 'react-router-dom'
import { space, SpaceProps, themeGet } from 'styled-system'
import { inheritLink } from '../globals'
import { Container } from '../layout'

export const Navbar = styled(Flex)`
  background: ${themeGet('colors.grays.8')};
`

export const NavbarContainer = styled(Container)`
position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  justify-content: space-between;
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
NavLink.defaultProps = { p: 'lg' }

export const Logo = styled(NavLink)`
  margin-right: ${themeGet('space.lg')}px;
  font-weight: ${themeGet('fontWeights.normal')};
`

export const NavProfile = styled(NavItem)`
`

export const ProfileDrop = styled(Box)`
  position: relative;
  height: 100%;
`

interface ProfileToggleProps extends BoxProps {
  isActive?: boolean
}

export const ProfileToggle = styled(Box)<ProfileToggleProps>`
  display: flex;
  align-items: center;
  padding-top: 0;
  padding-bottom: 0;
  height: 100%;
  cursor: pointer;
  
  ${inheritLink};
  
  ${props =>
  props.isActive ? css`
    color: ${themeGet('bg.default')};
    background-color: ${themeGet('bg.dropdown')};
  ` : css`
    &:hover,
    &:focus {
      ${inheritLink};
      background-color: ${themeGet('colors.grays.7')};
    }
  `}
`
ProfileToggle.defaultProps = { p: 'md' }

