import { CreateItemParams, EditItemParams, MiscItem } from '../types'
import { config } from '../config/config'
import { wavesItemsApi } from '@waves/waves-games'

const itemsApi = wavesItemsApi(config.networkCode, config.contractAddress)

export const miscRecordToArray = (miscRecord: Record<string, any>): MiscItem[] => {
  return Object.keys(miscRecord).map(key => ({ key, value: miscRecord[key] }))
}

export const miscArrayToRecord = (miscArray: MiscItem[]): Record<string, any> => {
  return miscArray.reduce((prev, current) => ({ ...prev, [current.key]: current.value }), {})
}

export const createItem = async (params: CreateItemParams) => {
  const request = itemsApi.createItem(params)

  return await request.broadcast()
}

export const editItem = async (params: EditItemParams) => {
  const request = itemsApi.editItem(params)

  return await request.broadcast()
}

export const sellItem = async (assetId: string, amount: number, priceAsset: string, price: number) => {
  const request = itemsApi.sell(assetId, amount, priceAsset, price)

  return await request.broadcast()
}

export const buyItem = async (lotId: string, amount: number) => {
  const request = itemsApi.buy(lotId, amount)

  return await request.broadcast()
}

export const cancelLot = async (lotId: string) => {
  const request = itemsApi.cancel(lotId)

  return await request.broadcast()
}
