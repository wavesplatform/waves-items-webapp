import styled from 'styled-components'
import { Text, TextProps } from 'rebass'
import { borders, BordersProps } from 'styled-system'
import { Icon } from '../icon'

export const WavesCy = styled(Text)<TextProps & BordersProps>`
  text-transform: uppercase;
  
  &:before {
    content: 'Waves';
  }
  
  ${borders}
`
WavesCy.defaultProps = {
  as: 'span',
  fontSize: 'xs',
  color: 'placeholder',
}

export const WavesCyIcon = styled(Icon).attrs({
  glyph: 'waves',
  color: 'fades.white.2',
})`
`
