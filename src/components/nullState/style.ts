import styled from 'styled-components'
import { Flex, FlexProps } from 'rebass'
import { H2 } from '../globals'

export interface StyledNullStateProps extends FlexProps {
}

export const StyledNullState = styled(Flex)<StyledNullStateProps>`
  width: 100%;
`
StyledNullState.defaultProps = {
  ...StyledNullState.defaultProps,
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'center',
  px: 3,
  py: 3,
}

export const Title = styled(H2)`
  width: 100%;
  text-align: center;
`
