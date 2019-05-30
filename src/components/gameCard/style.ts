import styled from 'styled-components'
import { Box, Card } from 'rebass'
import { themeGet } from 'styled-system'
import { H3, truncate } from '../globals'

export const GameCardContainer = styled(Card)`
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  padding-top: 120%;
`

export const Title = styled(H3)`
  ${truncate};
  margin: 0;
  font-size: ${themeGet('fontSizes.lg')}px;
`

export const Overview = styled(Box)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
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
    background-image: linear-gradient(to top,rgba(0,0,0,0.7) 20%,transparent 80%);
  }
`

export const Image = styled(Box)`
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  transition: transform .1s ease-out;
  
  ${GameCardContainer}:hover & {
    transform: scale(1.05);
  }
`

export const Inner = styled(Box)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`
Inner.defaultProps = {
  p: 'lg',
}
