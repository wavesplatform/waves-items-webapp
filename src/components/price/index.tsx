import React from 'react'
import { BigNumber } from '@waves/bignumber'
import { Color } from '../globals'
import { Flex } from 'rebass'
import { WavesCyIcon } from '../globals/currencies'
import styled from 'styled-components'

type TProps = {
  value: number | string | BigNumber
}

const PriceWrapper = styled(Flex)`
  display: inline-flex;
`

const Price = (props: TProps) => {
  const value = new BigNumber(props.value)

  return (
    <PriceWrapper alignItems={'center'}>
      <Color mr={'xs'}>{value.toFixed()}</Color>
      <WavesCyIcon fontSize={'sm'}/>
    </PriceWrapper>
  )
}

export default Price
