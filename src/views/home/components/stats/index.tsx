import React, { Component, ReactNode } from 'react'
import { Column, IconWrapper, Row } from './style'
import { Icon } from '../../../../components/icon'
import { H3 } from '../../../../components/globals'

type TProps = {}

export class Stats extends Component<TProps> {
  render(): ReactNode {

    return (
      <Row>
        <Column>
          <IconWrapper color={'red'}>
            <Icon glyph={'games'}/>
          </IconWrapper>
          <H3>
            <b>12</b> Games
          </H3>
        </Column>
        <Column>
          <IconWrapper color={'blue'}>
            <Icon glyph={'filter'}/>
          </IconWrapper>
          <H3>
            <b>843</b> Items
          </H3>
        </Column>
        <Column>
          <IconWrapper color={'orange'}>
            <Icon glyph={'compare_arrows'}/>
          </IconWrapper>
          <H3>
            <b>9217</b> Transactions
          </H3>
        </Column>
      </Row>
    )
  }
}

export default Stats
