import { BigNumber } from '@waves/bignumber'
import { config } from '../config/config'

const POWER_16 = '10000000000000000'
const POWER_8 = '100000000'

export const toWaves = (value: string | BigNumber): BigNumber => {
  const res = new BigNumber(value)
  return res.div(POWER_16)
}

export const toWavesFromKeeper = (value: string | BigNumber): BigNumber => {
  const res = new BigNumber(value)
  return res.div(POWER_8)
}

export const generateExchangeLink = (address: string, amount: string): string => {
  return `${config.exchangeUrl}?crypto=WAVES&fiat=USD&address=${address}&amount=${amount}`
}
