import { Box, BoxProps, Flex, FlexProps, Heading, Image, LinkProps, Text } from 'rebass'
import styled, { css } from 'styled-components'
import { Link, LinkProps as RouterLinkProps } from 'react-router-dom'
import { space, SpaceProps, themeGet } from 'styled-system'
import { truncate } from '../globals'
import { Container } from '../layout'
import { Icon } from '../icon'

export const NavbarWrapper = styled(Box)`
  height: ${themeGet('header.height')}px;
`

export const Navbar = styled(Flex)`
  height: ${themeGet('header.height')}px;
  background: ${themeGet('bg.default')};
  border-bottom: 1px solid ${themeGet('colors.grays.7')};
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 3;
`

export const NavbarContainer = styled(Container)`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  justify-content: space-between;
`
NavbarContainer.defaultProps = { px: 'lg' }

export const Nav = styled(Flex)`
  flex-wrap: wrap;
  padding-left: 0;
  margin-bottom: 0;
  list-style: none;
`
Nav.defaultProps = { as: 'ul' }

export interface NavItemProps extends BoxProps {
  isActive?: boolean
}

export const NavItem = styled(Box)<NavItemProps>`
  ${props => props.isActive && css`
    background: ${themeGet('colors.grays.8')};
  `};
`
NavItem.defaultProps = { as: 'li' }

type NavLinkProps = FlexProps & Partial<RouterLinkProps> & LinkProps
export const NavLink = styled(Flex)<NavLinkProps>`
  display: flex;
  align-items: center;
  height: 100%;
  color: ${themeGet('colors.default')};
  
  &:hover,
  &:focus {
    background: ${themeGet('colors.grays.8')};
  }
  
  ${space}
`
NavLink.defaultProps = { as: Link, px: 'lg' }

export const Logo = styled(Link)`
  display: flex;
  align-items: center;
  height: 100%;
  margin-right: ${themeGet('space.lg')}px;
`

export const LogoImage = styled(Image)`
  width: 80px;
`

export const LogoTitle = styled(Heading)`
  font-weight: ${themeGet('fontWeights.normal')};
`
LogoTitle.defaultProps = {
  fontSize: 'base',
}

export const NavProfile = styled(NavItem)`
`

export const UserName = styled(Text)`
  ${truncate};
  max-width: 180px;
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
  position: relative;
  align-items: center;
  padding-top: 0;
  padding-bottom: 0;
  height: 100%;
  cursor: pointer;
  border-left: 1px solid ${themeGet('colors.grays.7')};
  border-right: 1px solid ${themeGet('colors.grays.7')}; 
  justify-content: flex-end;
  
  &:hover,
  &:focus {
    background-color: ${themeGet('colors.grays.8')};
  }
  
  ${props =>
  props.isActive && css`
    min-width: 192px;
  `}
`
ProfileToggle.defaultProps = { p: 'md' }

export const ToggleIcon = styled(Icon)`
`

