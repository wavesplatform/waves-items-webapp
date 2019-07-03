import React, { ChangeEvent, Component, PropsWithChildren, ReactNode } from 'react'
import { Box, Flex } from 'rebass'
import { TextInput } from '../../../components/inputs'
import { Button } from '../../../components/buttons'
import { RemoveButton } from '../style'
import { MiscItem } from '../../../types'

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

  componentDidUpdate(
    prevProps: Readonly<React.PropsWithChildren<TProps>>,
    prevState: Readonly<{}>
  ): void {
    if (prevState !== this.state) {
      this.props.onChange && this.props.onChange(this.state.misc)
    }
  }

  render(): ReactNode {
    const { children } = this.props

    const list = this.state.misc.map((miscItem, index) => (
      <Flex key={index} mt={'sm'}>
        <Box width={2 / 5}>
          <TextInput value={miscItem.key}
                     onChange={this._changeKey(index)}
                     placeholder={'Key'}
                     mt={0}
          />
        </Box>
        <Flex width={3 / 5} ml={'base'} alignItems={'center'}>
          <TextInput value={miscItem.value}
                     onChange={this._changeValue(index)}
                     placeholder={'Value'}
                     mt={0}
                     flex={'1'}
          />
          <RemoveButton ml={'base'} onClick={() => {
            this._removeRow(index)
          }}/>
        </Flex>
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

  _removeRow = (index: number) => {
    this.setState({
      misc: this.state.misc.filter((miscItem, i) => (i !== index)),
    })
  }
}

export default MiscEditor
