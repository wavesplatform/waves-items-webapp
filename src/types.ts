import { LONG } from '@waves/types'
import { ApolloError } from 'apollo-client'

export interface IDefaultResult {
  loading: boolean
  error?: ApolloError
}

export interface IUser {
  id?: string
  name?: string
  address: string
  publicKey?: string
}

export interface IGame extends IUser {
}

export type AmountPricePair = {
  amountAsset: string
  priceAsset: string
}

export type AmountPrice = {
  amount: number
  price: number
}

export interface IWavesAsset {
  assetId: string
  timestamp?: string | number
  quantity?: LONG
  reissuable?: boolean
  misc?: any
  rawParams?: any
}

export interface IItem extends IWavesAsset {
  id: string
  name: string
  imageUrl: string
  createdAt?: string
  game: IGame
}
