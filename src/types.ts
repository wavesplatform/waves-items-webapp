import { LONG } from '@waves/types'
import { ApolloError } from 'apollo-client'

export interface IDefaultResult {
  loading: boolean
  error?: ApolloError
}

export type UserImage = {
  icon: string
  page?: string
  promo?: string
}

export type WithImage<P> = P & {
  image?: UserImage
}

export interface IUser extends WithImage<{}> {
  id?: string
  name?: string | null
  email?: string
  address: string
  publicKey?: string
}

export interface IGame extends IUser {
  totalItems?: number | null
}

export type AmountPricePair = {
  amountAsset: string
  priceAsset: string
}

export type AmountPrice = {
  amount: string
  price: string
}

export type WithOrders<P> = P & {
  pair?: AmountPricePair;
  bids?: AmountPrice[];
  asks?: AmountPrice[];
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

export type WithBalance<P> = P & {
  balance?: number
}
