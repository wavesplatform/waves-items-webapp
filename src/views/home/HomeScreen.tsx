import React, { Component, ReactNode } from 'react'
import cn from 'classnames'
import { RouteComponentProps } from 'react-router'
import { Container, Section } from '@crutch/components'

const displayName = 'HomeScreen'

interface IProps extends RouteComponentProps {
}

class HomeScreen extends Component<IProps> {
  render(): ReactNode {
    const classes = cn(
      displayName
    )

    return (
      <Section className={classes}>
        <Container>
          <div className={`${displayName}-body`}>
            <h1>Home</h1>
          </div>
        </Container>
      </Section>
    )
  }
}


export default HomeScreen

