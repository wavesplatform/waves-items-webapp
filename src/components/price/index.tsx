import React from 'react'
import { BigNumber } from '@waves/bignumber'
import { Color } from '../globals'
import { Flex } from 'rebass'
import { WavesCyIcon } from '../globals/currencies'
import styled from 'styled-components'

type TProps = {
  value: number | string | BigNumber
}

const Wrapper = styled(Flex)`
  display: inline-flex;
`

const Price = (props: TProps) => {
  const value = new BigNumber(props.value)

  return (
    <Wrapper alignItems={'center'}>
      <Color mr={'xs'}>{value.toFixed()}</Color>
      <WavesCyIcon fontSize={'sm'}/>
    </Wrapper>
  )
}

export default Price
