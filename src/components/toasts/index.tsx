import React from 'react'
import { ToastContainer, ToastContainerProps } from './style'

interface IToastProps extends ToastContainerProps {
}

export const Toast = (props: IToastProps) => (
  // @ts-ignore
  <ToastContainer {...props}>
    {props.children}
  </ToastContainer>
)
