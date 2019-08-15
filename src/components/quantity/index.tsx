import React from 'react'
import { BigNumber } from '@waves/bignumber'
import { Icon } from '../icon'
import { Nft } from './style'
import { Color } from '../globals'
import { Flex } from 'rebass'
import styled from 'styled-components'

type TProps = {
  value?: number | string | BigNumber
}

const Wrapper = styled(Flex)`
  display: inline-flex;
`

const Quantity = (props: TProps) => {
  const value = props.value && new BigNumber(props.value)

  if (!value) {
    return (
      <>-</>
    )
  }

  if (value.gt(1)) {
    return (
      <Wrapper alignItems={'center'}>
        <Color mr={'xs'}>{value.toFixed()}</Color>
        <Icon glyph={'fiber_smart_record'}
              color={'fades.white.2'}
              fontSize={'sm'}/>
      </Wrapper>
    )
  }

  return (
    <Nft bg={'fades.white.2'} fontSize={'xs'}>Uniq</Nft>
  )
}

export default Quantity
