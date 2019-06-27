import React, { Component, ReactNode } from 'react'
import { ViewWrapper } from '../../components/layout'
import { RouteComponentProps } from 'react-router'
import About from './about'

interface IProps extends RouteComponentProps {
}

class PagesView extends Component<IProps> {
  render(): ReactNode {
    return (
      <ViewWrapper>
        {this._renderPage()}
      </ViewWrapper>
    )
  }

  _renderPage = () => {
    switch (this.props.match.path) {
      case '/about': {
        return <About {...this.props} />
      }
    }
  }
}

export default PagesView
