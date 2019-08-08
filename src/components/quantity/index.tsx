import React from 'react'
import { BigNumber } from '@waves/bignumber'
import { Icon } from '../icon'
import { Nft } from './style'
import { Color } from '../globals'

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
      <Color>
        {value.toFixed()} <Icon glyph={'fiber_smart_record'}
                                variant={'baseline'}
                                color={'fades.white.2'}
                                fontSize={'sm'}/>
      </Color>
    )
  }

  return (
    <Nft bg={'fades.white.2'} fontSize={'xs'}>Uniq</Nft>
  )
}

export default Quantity
