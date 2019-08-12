import styled from 'styled-components'
import { Flex, FlexProps } from 'rebass'

export interface StyledLoadingProps extends FlexProps {
}

export const StyledLoading = styled(Flex)<StyledLoadingProps>`
  align-items: center;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
`
StyledLoading.defaultProps = {
  ...StyledLoading.defaultProps,
  px: 4,
  py: 4,
}
