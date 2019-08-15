import { Flex, Image } from 'rebass'
import styled from 'styled-components'
import { themeGet } from 'styled-system'
import { Link } from 'react-router-dom'

export const FooterContainer = styled(Flex)`
  height: 6rem;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  border-top: 1px solid ${themeGet('colors.grays.7')};
  flex-wrap: wrap;
  align-items: stretch;
  justify-content: flex-end;
`
FooterContainer.defaultProps = { p: 'lg' }

export const Logo = styled(Link)`
  display: flex;
  align-items: center;
  height: 100%;
  margin-left: ${themeGet('space.lg')}px;
  opacity: .5;
  
  &:hover {
    opacity: 1;
  }
`

export const LogoImage = styled(Image)`
  width: 90px;
  opacity: .6;
  
  ${Logo}:hover & {
    opacity: 1;
  }
`
