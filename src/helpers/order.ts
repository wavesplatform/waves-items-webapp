import { BigNumber } from '@waves/bignumber'

export const toWaves = (value: string | BigNumber): BigNumber => {
  const res = new BigNumber(value)
  return res.div(16)
}
