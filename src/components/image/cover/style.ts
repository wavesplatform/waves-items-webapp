import styled, { css } from 'styled-components'
import { Box, BoxProps, Image } from 'rebass'
import { themeGet } from 'styled-system'

export const CoverContainer = styled(Box)<{ isEmpty?: boolean, editable?: boolean } & BoxProps>`
  position: relative;
  height: 100%;
  overflow: hidden;
  border-radius: ${themeGet('radii.lg')}px;
  background: ${themeGet('colors.grays.8')};
  
  ${props => (props.isEmpty && props.editable) && css`
    background: ${themeGet('colors.black')};
    border: 2px dashed ${themeGet('colors.border.inputHover')};
  `};
  
  &:before {
    position: absolute;
    content: '';
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
  }
  
  ${props => !props.isEmpty && css`
    &:before { background-image: linear-gradient(to top,rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.2) 100%); }
  `};
`

export const StyledImage = styled(Image)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: none;
  height: 100%;
  width: 100%;
  object-fit: cover;
  display: block;
`

