import styled from 'styled-components'
import { Box, BoxProps } from 'rebass'

export interface StyledLoadingProps extends BoxProps {
}

export const StyledLoading = styled(Box)<StyledLoadingProps>`
  align-items: center;
`
StyledLoading.defaultProps = {
  ...StyledLoading.defaultProps,
  px: 3,
  py: 3,
}
