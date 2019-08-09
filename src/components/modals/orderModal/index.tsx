import React, { ChangeEvent, Component, FormEvent, ReactNode } from 'react'
import { ModalContainer } from '../container'
import { modalStyles } from '../style'
import { Button } from '../../buttons'
import { Box, Flex, Link } from 'rebass'
import { Actions, Form, H2 } from '../../globals'
import { NumberInput, TextInput, TextInputWithUnit } from '../../inputs'
import keeperHelper, { IWavesNetworkCode } from '../../../helpers/keeper'
import { config } from '../../../config/config'
import { IModalProps } from '../index'
import { IItem } from '../../../types'
import { IKeeperContext } from '../../../contexts/keeper'
import { BigNumber } from '@waves/bignumber'
import { Toast } from '../../toasts'
import { generateExchangeLink } from '../../../helpers/order'
import { Icon } from '../../icon'

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
    const { show, setShow, type, item, keeperContext, defaultPrice } = this.props
    const { publicState } = keeperContext

    const isBuy = type === 'buy'
    const account = publicState.account
    const styles = modalStyles(420)

    const haveBalanceGtZero = account && (new BigNumber(account.balance.available)).gt(0)
    const exchangeLink = account && generateExchangeLink(account.address, '10')
    const isNft = !!item.quantity && (new BigNumber(item.quantity)).eq(1)

    return (
      <Modal
        isOpen={show}
        onRequestClose={() => {
          setShow(false)
        }}
        style={styles}
      >
        <ModalContainer
          title={isBuy ? 'Buy Item' : 'Sell Item'}
          ignoreHeader={true}
          onClose={() => {
            setShow(false)
          }}
        >
          <Flex>
            <Box width={1}>
              {!haveBalanceGtZero ? (
                <>
                  <Toast mb={'lg'}>
                    Incorrect balance.<br/>
                    You can get Waves via external service.
                  </Toast>
                  <Button
                    as={Link}
                    href={exchangeLink}
                    target={'_blank'}
                    variant='primary'
                    size={'lg'}
                    width={1}
                  >
                    Get Waves
                    <Icon variant={'baseline'} glyph={'open_in_new'} ml={'xs'} color={'fades.white.4'}/>
                  </Button>
                </>
              ) : (
                <>
                  {isBuy && !defaultPrice && <Toast mb={'lg'}>
                    No one is selling this item yet, but you can be the first one to make a bet.
                  </Toast>}
                  <H2 mb={0}>
                    {item.name}
                  </H2>
                  <Form onSubmit={ev => this._handleSubmit(ev)}>
                    <Flex>
                      <Box width={1 / 3}>
                        <TextInput value={this.state.amount}
                                   onChange={this._changeAmount}
                                   disabled={isNft}
                        >Amount</TextInput>
                      </Box>
                      <Box width={2 / 3} ml={'base'}>
                        <TextInputWithUnit value={this.state.price}
                                           onChange={this._changePrice}
                        >Price</TextInputWithUnit>
                      </Box>
                    </Flex>
                    <NumberInput value={this.state.period}
                                 onChange={this._changePeriod}
                    >Period (in seconds)</NumberInput>
                    <Actions>
                      <Button type='submit' variant={'primary'} size={'lg'}
                              width={1}>{isBuy ? 'Buy' : 'Sell'}</Button>
                    </Actions>
                  </Form>
                </>
              )}
            </Box>
          </Flex>
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
        version: 2,
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
