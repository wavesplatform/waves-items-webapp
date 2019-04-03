import React, { PureComponent, ReactNode } from 'react'
import { Navbar } from '../elements/Navbar'
import { Logo } from '../elements/Logo'

interface IProps {
}

export class Header extends PureComponent<IProps> {
  render(): ReactNode {
    return (
      <Navbar>
        <Logo mr={[2]}/>
      </Navbar>
    )
  }
}

export default Header
