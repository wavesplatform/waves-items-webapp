import { Image, ImageProps } from 'rebass'
import styled from 'styled-components'

type ItemImageProps = {
  size: number
}
const ItemImage = styled(Image)<ItemImageProps & ImageProps>`
  display: block;
  max-width: ${props => props.size}px;
  height: auto;
  max-height: ${props => props.size}px;
  margin: 0 auto;
`

export default ItemImage
