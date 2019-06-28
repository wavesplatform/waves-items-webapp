import React, { ChangeEvent, Component, PropsWithChildren, ReactNode } from 'react'
import { Box, Flex } from 'rebass'
import { TextInput } from '../../../components/inputs'
import { Button } from '../../../components/buttons'

export type MiscItem = { key: string, value: string }

type TProps = {
  value?: MiscItem[]
  onChange?: (value: MiscItem[]) => void,
}

type TState = {
  misc: MiscItem[]
}

const emptyMiscItem = { key: '', value: '' }

class MiscEditor extends Component<PropsWithChildren<TProps>> {
  state: TState = {
    misc: [emptyMiscItem],
  }

  constructor(props: TProps) {
    super(props)

    if (props.value) {
      this.state.misc = props.value
    }
  }

  render(): ReactNode {
    const { children } = this.props

    const list = this.state.misc.map((miscItem, index) => (
      <Flex key={index}>
        <Box width={1 / 2}>
          <TextInput value={miscItem.key}
                     onChange={this._changeKey(index)}
                     placeholder={'Key'}
          />
        </Box>
        <Box width={1 / 2} ml={'base'}>
          <TextInput value={miscItem.value}
                     onChange={this._changeValue(index)}
                     placeholder={'Value'}
          />
        </Box>
      </Flex>
    ))

    return (
      <>
        {children && <Box mt={'base'}>{children}</Box>}
        <Box mb={'base'}>{list}</Box>
        <Button onClick={this._addRow}>Add record</Button>
      </>
    )
  }

  _changeKey = (index: number) => (ev: ChangeEvent<HTMLInputElement>) => {
    const key = ev.target.value

    this.setState({
      misc: this.state.misc.map((miscItem, i) => (i !== index) ? miscItem : { ...miscItem, key }),
    })
  }

  _changeValue = (index: number) => (ev: ChangeEvent<HTMLInputElement>) => {
    const value = ev.target.value

    this.setState({
      misc: this.state.misc.map((miscItem, i) => (i !== index) ? miscItem : { ...miscItem, value }),
    })
  }

  _addRow = () => {
    this.setState({
      misc: this.state.misc.concat([emptyMiscItem]),
    })
  }
}

export default MiscEditor
