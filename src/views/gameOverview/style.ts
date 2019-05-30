import styled from 'styled-components'
import { Box, Flex, Image, Text } from 'rebass'
import { themeGet } from 'styled-system'

export const GameOverviewContainer = styled(Flex)`
  height: 160px;
  overflow: hidden;
`

export const Banner = styled(Flex)`
  position: relative;
  height: 100%;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  flex: 1;
`
Banner.defaultProps = { pl: 'xl', pr: 'xxl' }

export const BannerImageWrapper = styled(Box)`
  position: absolute;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  overflow: hidden;
  border-radius: ${themeGet('radii.lg')}px;
  
  &:before {
    position: absolute;
    content: '';
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    background-image: linear-gradient(to top,rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.2) 100%);
  }
`

export const BannerImage = styled(Image)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: none;
  height: 100%;
  width: 100%;
  object-fit: cover;
  display: block;
  //opacity: .5;
`

export const BannerContent = styled(Flex)`
  position: relative;
  z-index: 1;
  align-items: center;
`

export const Icon = styled(Box)`
`
Icon.defaultProps = { mr: 'lg' }

export const Description = styled(Text)`
  opacity: .7;
`

export const Info = styled(Flex)`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 200px;
`
Info.defaultProps = { p: 'xl' }
