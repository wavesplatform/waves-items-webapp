import styled from 'styled-components'
import { Box, Flex } from 'rebass'

export const Cover = styled(Flex)`
  position: relative;
  height: 110px;
  align-items: center;
  justify-content: flex-start;
`
Cover.defaultProps = { pl: 'xl', pr: 'xl' }

export const CoverImageUnderlay = styled(Box)`
  position: absolute;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
`

export const CoverContent = styled(Box)`
  position: relative;
  z-index: 1;
`
