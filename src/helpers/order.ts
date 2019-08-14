import { BigNumber } from '@waves/bignumber'
import { config } from '../config/config'
import { ItemLot } from '../types'

const POWER_16 = '10000000000000000'
const POWER_8 = '100000000'

export enum ProfitPriceType {
  Min,
  Max,
}

export const toWaves = (value: string | number | BigNumber): BigNumber => {
  const res = new BigNumber(value)
  return res.div(POWER_8)
}

export const toSatoshi = (value: string | number | BigNumber): BigNumber => {
  const res = new BigNumber(value)
  return res.mul(POWER_8)
}

export const generateExchangeLink = (address: string, amount: string): string => {
  return `${config.exchangeUrl}?crypto=WAVES&fiat=USD&address=${address}&amount=${amount}`
}

export const getProfitLot = (lots: ItemLot[], type: ProfitPriceType): ItemLot | undefined => {
  if (!lots.length) {
    return
  }

  try {
    return lots.reduce((previousLot: ItemLot | undefined, currentLot: ItemLot) => {
      if (!previousLot) {
        return currentLot
      }

      const previousPrice = new BigNumber(previousLot.price)
      const currentPrice = new BigNumber(currentLot.price)

      return currentPrice.lt(previousPrice) ? currentLot : previousLot
    }, lots[0])
  } catch (err) {
    return
  }
}
