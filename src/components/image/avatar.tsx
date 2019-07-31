import React from 'react'
import { themeGet, variant } from 'styled-system'
import { Box, BoxProps, Image, ImageProps } from 'rebass'
import styled from 'styled-components'

const avatarStyle = variant({
  key: 'avatars',
})

interface AvatarProps extends ImageProps {
  variant?: string
}

const AvatarImageContainer = styled(Box)<BoxProps & AvatarProps>`
  border-radius: 50%;
  overflow: hidden;
  background: ${themeGet('colors.grays.7')};
  
  ${avatarStyle}
`

const Avatar = styled(Image)`
  max-width: none;
  display: block;
  height: 100%;
  width: 100%; 
`

type TProps = {
  src?: string
  size?: string
}

const AvatarImage = (props: TProps) => {
  const { src, size } = props
  return (
    <AvatarImageContainer variant={size || 'sm'}>
      {src &&
      <Avatar src={src}/>}
    </AvatarImageContainer>
  )
}

export default AvatarImage
