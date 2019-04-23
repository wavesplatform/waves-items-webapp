import { ApolloError } from 'apollo-boost'
import { LONG } from '@waves/types'

export interface IDefaultResult {
  loading: boolean
  error?: ApolloError
}

export interface IUser {
  id: string
  name: string
  address: string
}

export interface IGame extends IUser {
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
