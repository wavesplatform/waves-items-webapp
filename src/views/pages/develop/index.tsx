import React from 'react'
import { Content, PageContainer } from '../style'
import { H1 } from '../../../components/globals'

interface IProps {
}

export const Develop = (props: IProps) => {
  return (
    <PageContainer>
      <Content>
        <H1>Develop</H1>
        Content
      </Content>
    </PageContainer>
  )
}

export default Develop
