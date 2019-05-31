import styled, { css } from 'styled-components'
import { Box, BoxProps, Flex, FlexProps, Text } from 'rebass'
import { H1, H3, truncate } from '../globals'
import { themeGet } from 'styled-system'

export type WithIsPage<P> = P & {
  isPage?: boolean
}

export const ItemDetailContainer = styled(Flex)<WithIsPage<FlexProps>>`
  position: relative;
  flex-direction: ${props => (props.isPage ? 'row-reverse' : 'row')};
`

export const LeftSide = styled(Box)`
  flex: 1;
`

export const RightSide = styled(Box)<WithIsPage<BoxProps>>`
  flex-basis: 50%;
  ${props => props.isPage ? css`
    margin-right: ${themeGet('space.lg')}px;
  ` : css`
    margin-left: ${themeGet('space.lg')}px;
  `};
`

export const Title = styled(H1)`
  ${truncate};
`

export const Params = styled(Box)`
  padding: 0;
`
Params.defaultProps = {
  as: 'ul',
}

export const Param = styled(Flex)`
  padding: ${themeGet('space.md')}px 0;
  border-top: 1px solid ${themeGet('colors.grays.7')};
  border-bottom: 1px solid ${themeGet('colors.grays.7')};
  display: flex;
  align-items: center;
`
Param.defaultProps = {
  as: 'li',
}

export const ParamTitle = styled(H3)`
  ${truncate};
  
  margin: 0 ${themeGet('space.sm')}px 0 0;
  font-size: ${themeGet('fontSizes.base')}px;
  font-weight: ${themeGet('fontWeights.normal')};
  color: ${themeGet('colors.grays.4')};
`

export const ParamValue = styled(Text)`
  flex: 1;
  text-align: right;
`

export const Overview = styled(Box)`
  position: relative;
  padding: ${themeGet('space.base')}px 0;
`

export const ImageWrapper = styled(Box)`
  position: relative;
  transition: transform .1s ease-out;

  img {
    max-width: 100%;
    max-height: 360px;
    margin: 0 auto;
    height: auto;
    display: block;
  }
`
