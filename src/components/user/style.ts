import styled from 'styled-components'
import { Flex, Heading } from 'rebass'
import { truncate } from '../globals'

export const Wrapper = styled(Flex)`
  align-items: center;
  min-width: 0;
`

export const Title = styled(Heading)`
  ${truncate};
`
