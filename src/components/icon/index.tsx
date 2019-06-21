import React from 'react'
import { StyledIcon, StyledIconProps } from './style'

interface IIconProps extends StyledIconProps {
  glyph: string,
}

export const Icon = (props: IIconProps) => (
  //@ts-ignore
  <StyledIcon {...props}>
    <use xlinkHref={`/icons.svg#${props.glyph}`}/>
  </StyledIcon>
)
