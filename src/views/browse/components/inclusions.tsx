import React, { Component, ReactNode } from 'react'
import { Button } from '../../../components/buttons'

export const inclusionsMap = { sale: '' }
export type ItemInclusion = keyof typeof inclusionsMap

type TProps = {
  inclusions?: ItemInclusion[]
  onChange?: (inclusions: ItemInclusion[]) => void
}

type TState = {
  inclusions: ItemInclusion[]
}

class Inclusions extends Component<TProps> {
  state: TState = {
    inclusions: [],
  }

  constructor(props: TProps) {
    super(props)

    this.state.inclusions = props.inclusions || []
  }

  render(): ReactNode {
    const isSale = this.state.inclusions.includes('sale')
    const isAll = !this.state.inclusions.length

    return (
      <>
        <Button variant={isAll ? 'light' : undefined}
                size={'sm'}
                onClick={this._onChangeAll}
                mr={'base'}>
          All
        </Button>
        <Button variant={isSale ? 'light' : undefined}
                size={'sm'}
                onClick={() => this._onChangeInclusion('sale')}>
          For Sale
        </Button>
      </>
    )
  }

  _onChangeInclusion = (value: ItemInclusion) => {
    const { onChange } = this.props
    const isActive = this.state.inclusions.includes(value)

    const inclusions = isActive
      // Remove
      ? this.state.inclusions.filter((inclusion, i) => (inclusion !== value))
      // Or Add
      : this.state.inclusions.concat([value])

    this.setState({ inclusions })
    onChange && onChange(inclusions)
  }

  _onChangeAll = () => {
    const { onChange } = this.props

    // Clear
    const inclusions: ItemInclusion[] = []

    this.setState({ inclusions })
    onChange && onChange(inclusions)
  }
}

export default Inclusions
