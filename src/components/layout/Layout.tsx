import React, { ComponentProps, PureComponent, ReactNode } from 'react'
import cn from 'classnames'
import Header from '../header/Header'

const displayName = 'App'

export interface ILayoutProps extends ComponentProps<'div'> {
}

export class Layout extends PureComponent<ILayoutProps> {
  render(): ReactNode {
    const { children, className } = this.props
    const classes = cn(
      className,
      displayName
    )

    return (
      <div className={classes}>
        <Header/>
        {children}
      </div>
    )
  }
}

export default Layout
