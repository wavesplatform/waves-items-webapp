import { CreateItemParams, EditItemParams, MiscItem } from '../types'
import { config } from '../config/config'
import { wavesItemsApi } from '@waves/waves-games'

export const miscRecordToArray = (miscRecord: Record<string, any>): MiscItem[] => {
  return Object.keys(miscRecord).map(key => ({ key, value: miscRecord[key] }))
}

export const miscArrayToRecord = (miscArray: MiscItem[]): Record<string, any> => {
  return miscArray.reduce((prev, current) => ({ ...prev, [current.key]: current.value }), {})
}

export const createItem = async (params: CreateItemParams) => {
  const itemsApi = wavesItemsApi(config.networkCode)

  const request = itemsApi.createItem(params)

  return await request.broadcast()
}

export const editItem = async (params: EditItemParams) => {
  const itemsApi = wavesItemsApi(config.networkCode)

  const request = itemsApi.editItem(params)

  return await request.broadcast()
}
