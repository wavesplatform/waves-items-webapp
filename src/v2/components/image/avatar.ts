import { variant } from 'styled-system'
import { Image, ImageProps } from 'rebass'
import styled from 'styled-components'

const avatarStyle = variant({
  key: 'avatars',
})

interface AvatarProps extends ImageProps {
  variant?: string
}

const Avatar = styled(Image)<AvatarProps>`
  max-width: none;
  display: block;
  
  ${avatarStyle}
`

export default Avatar
