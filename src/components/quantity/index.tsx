import React from 'react'
import { BigNumber } from '@waves/bignumber'
import { Icon } from '../icon'
import { Nft } from './style'
import { Color } from '../globals'
import { Flex } from 'rebass'

type TProps = {
  value?: number | string | BigNumber
}

const Quantity = (props: TProps) => {
  const value = props.value && new BigNumber(props.value)

  if (!value) {
    return (
      <>-</>
    )
  }

  if (value.gt(1)) {
    return (
      <Flex alignItems={'center'}>
        <Color mr={'xs'}>{value.toFixed()}</Color>
        <Icon glyph={'fiber_smart_record'}
              color={'fades.white.2'}
              fontSize={'sm'}/>
      </Flex>
    )
  }

  return (
    <Nft bg={'fades.white.2'} fontSize={'xs'}>Uniq</Nft>
  )
}

export default Quantity
