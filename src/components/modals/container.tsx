import { BoxProps } from 'rebass'
import React from 'react'
import { CloseButton, Content, Header, ModalBody, Title } from './style'

interface IModalContainerProps extends BoxProps {
  title?: string
  onClose?: () => void
  ignoreHeader?: boolean
}

export const ModalContainer = (props: IModalContainerProps) => {
  const { onClose, children, title, ignoreHeader } = props
  return (
    <ModalBody>
      <CloseButton onClick={onClose}/>
      <Header ignoreHeader={ignoreHeader}>
        <Title>{title}</Title>
      </Header>
      <Content>
        {children}
      </Content>
    </ModalBody>
  )
}
