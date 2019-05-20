import styled from 'styled-components'
import { Box, Flex, Heading, Text } from 'rebass'
import { H2, H3, truncate } from '../globals'
import { themeGet } from 'styled-system'

export const ItemDetailContainer = styled(Flex)`
  position: relative;
`

export const LeftSide = styled(Box)`
  flex: 1;
`

export const RightSide = styled(Box)`
  flex-basis: 50%;
  margin-left: ${themeGet('space.md')}px;
`

export const Title = styled(H2)`
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
  height: 100%;
  position: relative;
`

export const ImageWrapper = styled(Box)`
  height: 100%;
  position: relative;
  padding-top: 100%;

  transition: transform .1s ease-out;

  img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: 100%;
    height: auto;
    display: block;
  }
`
