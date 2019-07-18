import styled from 'styled-components'
import { Card, CardProps } from 'rebass'
import { variant } from 'styled-system'

const toastStyle = variant({
  key: 'toasts',
})

export interface ToastContainerProps extends CardProps {
  variant?: string
}

export const ToastContainer = styled(Card)<ToastContainerProps>`
  align-items: center;
  
  ${toastStyle}
`
ToastContainer.defaultProps = {
  ...ToastContainer.defaultProps,
  px: 4,
  py: 3,
  bg: 'element',
  borderRadius: 'base',
}
