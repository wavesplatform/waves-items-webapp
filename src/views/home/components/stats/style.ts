import { Flex } from 'rebass'
import styled from 'styled-components'
import { H3 } from '../../../../components/globals'
import { themeGet } from 'styled-system'

export const Row = styled(Flex)`
  margin: 0 auto;
  justify-content: center;
`

export const Column = styled(Flex)`
  align-items: center;
  border-right: 1px solid ${themeGet('colors.grays.8')};
  
  &:last-child {
    border-right: 0;
  }
  
  ${H3} {
    margin: 0;
    font-weight: normal;
  }
`
Column.defaultProps = {
  px: 'lg',
}

export const IconWrapper = styled(Flex)`
  line-height: 1;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  opacity: .8;
`
IconWrapper.defaultProps = {
  mr: 'lg',
  fontSize: 3,
  bg: 'bg.card',
}
