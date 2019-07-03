import { MiscItem } from '../types'
import { config } from '../config/config'

export const miscRecordToArray = (miscRecord: Record<string, any>): MiscItem[] => {
  return Object.keys(miscRecord).map(key => ({ key, value: miscRecord[key] }))
}

export const miscArrayToRecord = (miscArray: MiscItem[]): Record<string, any> => {
  return miscArray.reduce((prev, current) => ({ ...prev, [current.key]: current.value }), {})
}

export const createItem = async (params: any) => {
  // const itemsService = wavesItems(config.networkCode)
  //
  // const request = itemsService.createItem(params)
  // console.log(request)
  //
  // return request
}
