import styled from 'styled-components'
import { Box, Card, Heading } from 'rebass'
import { themeGet } from 'styled-system'
import { Truncate } from '../globals'

export const ItemCardContainer = styled(Card)`
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background: ${themeGet('colors.card.bg')};
  background-clip: border-box;
  
  &:hover,
  &:focus {
    background-color: ${themeGet('colors.grays.7')};
  }
`

export const Title = styled(Heading)`
  ${Truncate};
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
