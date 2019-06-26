import React, { Component, ReactNode } from 'react'
import { Container, ViewWrapper } from '../../components/layout'
import { RouteComponentProps } from 'react-router'
import About from './about'
import Develop from './develop'

interface IProps extends RouteComponentProps {
}

class PagesView extends Component<IProps> {
  render(): ReactNode {
    return (
      <ViewWrapper>
        <Container>
          {this._renderPage()}
        </Container>
      </ViewWrapper>
    )
  }

  _renderPage = () => {
    switch (this.props.match.path) {
      case '/about': {
        return <About {...this.props} />
      }
      case '/develop': {
        return <Develop {...this.props} />
      }
    }
  }
}

export default PagesView
