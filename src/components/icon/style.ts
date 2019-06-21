import styled from 'styled-components'
import { fontSize, FontSizeProps, variant } from 'styled-system'

const iconStyle = variant({
  key: 'icons',
})

export interface StyledIconProps extends FontSizeProps {
  variant?: string
}

export const StyledIcon = styled.svg<StyledIconProps>`
  display: inline-block;
  width: 1em;
  height: 1em;
  stroke-width: 0;
  stroke: currentColor;
  fill: currentColor;
  
  ${fontSize}
  ${iconStyle}
`
StyledIcon.defaultProps = {
  fontSize: 'inherit',
}
