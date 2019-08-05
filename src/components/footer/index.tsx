import React, { Component, ReactNode } from 'react'
import { FooterContainer, Logo, LogoImage } from './style'

// import logo from '../globals/logo.svg'

interface IProps {
}

class Footer extends Component<IProps> {
  render(): ReactNode {
    return (
      <FooterContainer>
        <Logo to={'/'}>
          {/*<LogoImage src={logo}/>*/}
        </Logo>
      </FooterContainer>
    )
  }
}

export default Footer
