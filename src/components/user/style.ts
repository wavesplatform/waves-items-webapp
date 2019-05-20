import styled from 'styled-components'
import { Flex, Heading } from 'rebass'
import { truncate } from '../globals'

export const Wrapper = styled(Flex)`
  align-items: center;
`

export const Title = styled(Heading)`
  ${truncate}
`
