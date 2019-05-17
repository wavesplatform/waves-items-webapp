import styled from 'styled-components'
import { Flex, Heading } from 'rebass'
import { Truncate } from '../globals'

export const Wrapper = styled(Flex)`
  align-items: center;
`

export const Title = styled(Heading)`
  ${Truncate}
`
