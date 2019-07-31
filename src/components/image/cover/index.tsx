import React from 'react'
import { CoverContainer, StyledImage } from './style'

type TProps = {
  src?: string
  editable?: boolean
}

export const CoverImage = (props: TProps) => {
  const { src, editable } = props
  return (
    <CoverContainer isEmpty={!src} editable={editable}>
      {src &&
      <StyledImage src={src}/>}
    </CoverContainer>
  )
}
