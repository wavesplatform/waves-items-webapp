import React, { Component, ComponentProps, ReactNode } from 'react'
import cn from 'classnames'
import './Sidebar.scss'

const displayName = 'Sidebar'

interface IProps extends ComponentProps<'aside'> {
}

export class Sidebar extends Component<IProps> {
  render(): ReactNode {
    const { children, className } = this.props
    const classes = cn(
      className,
      displayName
    )

    return (
      <div className={classes}>
        <div className={`${displayName}-body`}>
          {children}
        </div>
      </div>
    )
  }
}

export default Sidebar
