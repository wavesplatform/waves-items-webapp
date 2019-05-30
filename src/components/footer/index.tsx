import React, { Component, ReactNode } from 'react'
import { FooterContainer, Logo, LogoImage } from './style'

interface IProps {
}

class Footer extends Component<IProps> {
  render(): ReactNode {
    return (
      <FooterContainer>
        <Logo to={'/'}>
          <LogoImage src={'/logo.svg'}/>
        </Logo>
      </FooterContainer>
    )
  }
}

export default Footer
