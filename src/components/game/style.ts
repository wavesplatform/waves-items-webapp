import styled from 'styled-components'
import { Box, Flex, Heading, Text } from 'rebass'
import { truncate } from '../globals'

export const Wrapper = styled(Flex)`
  align-items: center;
`

export const Title = styled(Heading)`
  ${truncate};
`

export const Description = styled(Text)`
  opacity: .7;
`
