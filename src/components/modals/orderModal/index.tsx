import React, { ChangeEvent, Component, FormEvent, ReactNode } from 'react'
import { ModalContainer } from '../container'
import { modalStyles } from '../style'
import { Button } from '../../buttons'
import { Box, Flex, Link } from 'rebass'
import { Actions, Form, H2 } from '../../globals'
import { TextInput, TextInputWithUnit } from '../../inputs'
import keeperHelper from '../../../helpers/keeper'
import { config } from '../../../config/config'
import { IModalProps } from '../index'
import { IItem } from '../../../types'
import { IKeeperContext, withKeeperContext } from '../../../contexts/keeper'
import { BigNumber } from '@waves/bignumber'
import { Toast } from '../../toasts'
import { generateExchangeLink, toSatoshi } from '../../../helpers/order'
import { Icon } from '../../icon'
import { buyItem, sellItem } from '../../../helpers/item'
import { compose } from 'react-apollo'
import TagManager from 'react-gtm-module'

const Modal = require('react-modal')
Modal.setAppElement('#root')

export type OrderType = 'buy' | 'sell'

interface IProps extends IModalProps, IKeeperContext {
  item: IItem
  type: OrderType
  defaultPrice?: string
  lotId?: string
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
    const { show, setShow, type, item, publicState, defaultPrice } = this.props

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
                                           disabled={isBuy}
                        >Price per item</TextInputWithUnit>
                      </Box>
                    </Flex>
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
    const { item, publicState, type, lotId } = this.props
    const { network } = publicState

    if (!keeperHelper.keeper || !network) {
      return
    }

    if (type === 'buy') {
      // Buying
      const amount = new BigNumber(this.state.amount).toNumber()
      const price = toSatoshi(this.state.price).toNumber()

      TagManager.dataLayer({ dataLayer: { event: 'purchaseattempt' } })

      lotId && await buyItem(lotId, amount)
    } else {
      // Selling
      const amount = new BigNumber(this.state.amount).toNumber()
      const price = toSatoshi(this.state.price).toNumber()

      TagManager.dataLayer({ dataLayer: { event: 'sellattempt' } })

      await sellItem(item.assetId, amount, config.wavesId, price)
    }
  }
}

export default compose(withKeeperContext)(OrderModal)
