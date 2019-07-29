import styled from 'styled-components'
import {
  color,
  ColorProps,
  fontSize,
  FontSizeProps,
  space,
  SpaceProps,
  variant,
  width,
  WidthProps
} from 'styled-system'

const iconStyle = variant({
  key: 'icons',
})

export interface StyledIconProps extends ColorProps, SpaceProps, WidthProps, FontSizeProps {
  variant?: string
}

export const StyledIcon = styled.svg<StyledIconProps>`
  ${color};

  display: inline-block;
  width: 1em;
  height: 1em;
  stroke-width: 0;
  stroke: currentColor;
  fill: currentColor;
  
  ${space};
  ${width};
  ${fontSize};
  ${iconStyle};
`
StyledIcon.defaultProps = {
  fontSize: 'inherit',
}
