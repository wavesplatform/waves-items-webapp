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
      <Header ignoreHeader={ignoreHeader}>
        <Title>{title}</Title>
        {/*<CloseButton onClick={onClose}/>*/}
      </Header>
      <Content>
        {children}
      </Content>
    </ModalBody>
  )
}
