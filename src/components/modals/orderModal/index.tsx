import React, { ChangeEvent, Component, FormEvent, ReactNode } from 'react'
import { ModalContainer } from '../container'
import { modalStyles } from '../style'
import { Button } from '../../buttons'
import { Box, Flex, Image, Text } from 'rebass'
import { Form } from '../../globals'
import { NumberInput, TextInput, TextInputWithUnit } from '../../inputs'
import keeperHelper, { IWavesNetworkCode } from '../../../helpers/keeper'
import { config } from '../../../config/config'
import { IModalProps } from '../index'
import { IItem } from '../../../types'
import { IKeeperContext } from '../../../contexts/keeper'
import defaultImage from '../../globals/image.svg'
import { ImageWrapper, Overview } from './style'

const Modal = require('react-modal')
Modal.setAppElement('#root')

export type OrderType = 'buy' | 'sell'

interface IProps extends IModalProps {
  item: IItem
  keeperContext: IKeeperContext
  type: OrderType,
  defaultPrice?: string,
}

interface IState {
  amount: string
  price: string
  period: string
}

const defaultPeriod = '86400'

class OrderModal extends Component<IProps> {
  state: IState = {
    amount: '1',
    price: '0.001',
    period: defaultPeriod,
  }

  constructor(props: IProps) {
    super(props)

    const { defaultPrice } = props

    this.state.price = defaultPrice || this.state.price
  }

  render(): ReactNode {
    const { show, setShow, type, item } = this.props
    const styles = modalStyles(420)

    return (
      <Modal
        isOpen={show}
        onRequestClose={() => {
          setShow(false)
        }}
        style={styles}
      >
        <ModalContainer
          title={type === 'buy' ? 'Buy Item' : 'Sell Item'}
          ignoreHeader={true}
          onClose={() => {
            setShow(false)
          }}
        >
          <Overview>
            <ImageWrapper>
              <Image
                src={item.imageUrl ? item.imageUrl : defaultImage}
                alt={`Item #${item.id}`}/>
            </ImageWrapper>
          </Overview>
          <Form onSubmit={ev => this._handleSubmit(ev)}>
            <Flex>
              <Box width={1 / 3}>
                <TextInput value={this.state.amount}
                           onChange={this._changeAmount}
                >Amount</TextInput>
              </Box>
              <Box width={2 / 3} ml={'base'}>
                <TextInputWithUnit value={this.state.price}
                                   onChange={this._changePrice}
                >Price</TextInputWithUnit>
              </Box>
            </Flex>
            <Flex justifyContent={'space-between'} alignItems={'flex-end'}>
              <Box width={1 / 2}>
                <NumberInput value={this.state.period}
                             onChange={this._changePeriod}
                >Period (in seconds)</NumberInput>
              </Box>
              <Flex width={1 / 2} ml={'base'} justifyContent={'flex-end'}>
                <Button type='submit' variant={'primary'} width={1}>{type === 'buy' ? 'Buy' : 'Sell'}</Button>
              </Flex>
            </Flex>
          </Form>
        </ModalContainer>
      </Modal>
    )
  }

  _changeAmount = (ev: ChangeEvent<HTMLInputElement>) => {
    const amount = ev.target.value

    this.setState({
      amount,
    })
  }

  _changePrice = (ev: ChangeEvent<HTMLInputElement>) => {
    const price = ev.target.value

    this.setState({
      price,
    })
  }

  _changePeriod = (ev: ChangeEvent<HTMLInputElement>) => {
    const period = ev.target.value

    this.setState({
      period,
    })
  }

  _handleSubmit = async (ev: FormEvent) => {
    ev.preventDefault()
    const { show, setShow } = this.props

    this._confirm()

    setShow(false)
  }

  _confirm = async () => {
    const { item, keeperContext, type } = this.props
    const { publicState: { network } } = keeperContext

    if (!keeperHelper.keeper || !network) {
      return
    }
    const chain = network && config.chains[network.code as IWavesNetworkCode]

    const orderDurationMs = parseInt(this.state.period || defaultPeriod, 10) * 1000
    const order = await keeperHelper.keeper.signAndPublishOrder({
      type: 1002,
      data: {
        matcherPublicKey: chain.matcher,
        orderType: type,
        amount: {
          tokens: this.state.amount,
          assetId: item.assetId,
        },
        price: {
          tokens: this.state.price,
          assetId: config.wavesId,
        },
        matcherFee: {
          tokens: '0.003',
          assetId: config.wavesId,
        },
        expiration: Date.now() + orderDurationMs,
      },
    })
  }
}

export default OrderModal
