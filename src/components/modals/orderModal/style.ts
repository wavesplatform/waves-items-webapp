import styled from 'styled-components'
import { Box } from 'rebass'
import { themeGet } from 'styled-system'

export const Overview = styled(Box)`
  position: relative;
`

export const ImageWrapper = styled(Box)`
  position: relative;
  transition: transform .1s ease-out;

  img {
    max-width: 100%;
    max-height: 210px;
    margin: 0 auto;
    height: auto;
    display: block;
    transform: rotateZ(2deg);
  }
`
