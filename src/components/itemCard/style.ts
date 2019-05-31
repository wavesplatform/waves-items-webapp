import styled from 'styled-components'
import { Box, Card, Text } from 'rebass'
import { themeGet } from 'styled-system'
import { H3, truncate } from '../globals'

export const ItemCardContainer = styled(Card)`
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background: ${themeGet('bg.card')};
  background-clip: border-box;
  border-radius: ${themeGet('radii.lg')}px;
  transition: background-color .2s ease-out;
  
  &:hover,
  &:focus {
    background-color: ${themeGet('colors.grays.7')};
  }
`

export const Title = styled(H3)`
  ${truncate};
  margin: 0;
`

export const Balance = styled(Text)`
  display: inline;
`

export const Overview = styled(Box)`
  height: 80%;
  position: relative;
`

export const ImageWrapper = styled(Box)`
  height: 80%;
  position: relative;
  padding-top: 80%;

  transition: transform .1s ease-out;
  
  ${ItemCardContainer}:hover & {
    transform: scale(1.05);
  }

  img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotateZ(2deg);
    max-width: 100%;
    max-height: 100%;
    height: auto;
    display: block;
  }
`
