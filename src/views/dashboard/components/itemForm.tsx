import React, { ChangeEvent, Component, FormEvent, ReactNode } from 'react'
import { IItem, MiscItem } from '../../../types'
import { Form, Paragraph } from '../../../components/globals'
import { Box, Card, Flex } from 'rebass'
import { TextInput, ToggleInput } from '../../../components/inputs'
import { Button } from '../../../components/buttons'
import MiscEditor from './miscEditor'
import { createItem, editItem, miscArrayToRecord, miscRecordToArray } from '../../../helpers/item'
import { RouteComponentProps, withRouter } from 'react-router'
import { BigNumber } from '@waves/bignumber'

type TProps = RouteComponentProps & {
  item?: IItem
}

type TState = {
  name: string
  quantity: string
  imageUrl: string
  misc?: MiscItem[]
  quantityIsDisabled?: boolean
}

class ItemForm extends Component<TProps> {
  state: TState = {
    name: '',
    quantity: '',
    imageUrl: '',
    quantityIsDisabled: false,
  }

  constructor(props: TProps) {
    super(props)

    const { item } = props

    if (item) {
      this.state.name = item.name
      this.state.quantity = item.quantity ? item.quantity.toString() : ''
      this.state.imageUrl = item.imageUrl || ''
      if (item.misc) {
        this.state.misc = miscRecordToArray(item.misc)
      }
    }
  }

  render(): ReactNode {
    const { item } = this.props
    const quantityBn = new BigNumber(this.state.quantity)

    return (
      <Form
        onSubmit={ev => this._handleSubmit(ev)}
      >
        <Flex>
          <Box width={1 / 2}>
            <TextInput value={this.state.name}
                       onChange={this._changeName}
                       placeholder={'Sword of Pain'}
            >Name</TextInput>
          </Box>
          <Box width={1 / 2} ml={'base'}>
            <TextInput value={this.state.quantity}
                       onChange={this._changeQuantity}
                       placeholder={'100'}
                       disabled={this.state.quantityIsDisabled || !!item}
            >Quantity</TextInput>
          </Box>
        </Flex>
        <Card p={'lg'}
              mt={'base'}
              bg={'bg.card'}
              borderRadius={'lg'}
        >
          <ToggleInput checked={quantityBn.eq(1)}
                       onChange={this._changeUnique}
                       disabled={!!item}
                       mt={0}
          >
            Unique item (Non-fungible token)
          </ToggleInput>
          <Paragraph mb={0} mt={'base'}>
            Lorem ipsum is placeholder text commonly used in the graphic, print, and
            publishing industries.
          </Paragraph>
        </Card>
        <Box>
          <TextInput value={this.state.imageUrl}
                     onChange={this._changeImageUrl}
                     placeholder={'Image URL'}
          >Image URL</TextInput>
        </Box>
        <Box mb={'lg'}>
          <MiscEditor value={this.state.misc} onChange={this._changeMisc}>Misc</MiscEditor>
        </Box>
        <Button type='submit' variant='primary' size={'lg'} width={1}>Save</Button>
      </Form>
    )
  }

  _changeName = (ev: ChangeEvent<HTMLInputElement>) => {
    const name = ev.target.value

    this.setState({
      name,
    })
  }

  _changeQuantity = (ev: ChangeEvent<HTMLInputElement>) => {
    const quantity = ev.target.value

    this.setState({
      quantity,
    })
  }

  _changeUnique = (ev: ChangeEvent<HTMLInputElement>) => {
    const checked = ev.target.checked

    this.setState({
      quantity: checked ? 1 : 10,
      quantityIsDisabled: checked,
    })
  }

  _changeImageUrl = (ev: ChangeEvent<HTMLInputElement>) => {
    const imageUrl = ev.target.value

    this.setState({
      imageUrl,
    })
  }

  _changeMisc = (misc: MiscItem[]) => {
    this.setState({
      misc,
    })
  }

  _handleSubmit = async (ev: FormEvent) => {
    ev.preventDefault()

    const { name, quantity, imageUrl } = this.state
    if (!name || !quantity || !imageUrl) {
      return
    }

    const misc = this._prepareMisc(this.state.misc)

    const isEdit = !!this.props.item

    try {
      const res = isEdit ? await editItem({
        itemId: this.props.item!.assetId,
        name,
        version: 1,
        imageUrl,
        misc: misc || {},
      }) : await createItem({
        name,
        version: 1,
        quantity: parseInt(quantity, 10),
        imageUrl,
        misc: misc || {},
      })

      this.props.history.push('/dashboard/items')
    } catch (err) {
      throw err
    }
  }

  _prepareMisc = (miscArray?: MiscItem[] | null): Record<string, any> | null => {
    miscArray = miscArray && miscArray.filter(miscItem => !!miscItem.key)

    let misc = null
    if (miscArray && miscArray.length) {
      misc = miscArrayToRecord(miscArray)
    }

    return misc
  }
}

export default withRouter(ItemForm)
