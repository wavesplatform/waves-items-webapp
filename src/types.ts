import { LONG } from '@waves/types'
import { ApolloError } from 'apollo-client'
import { ReactNode } from 'react'
import {
  ItemQuery_item_asks,
  ItemQuery_item_bids,
  ItemQuery_item_pair
} from './graphql/queries/__generated__/ItemQuery'

export interface IDefaultResult {
  loading: boolean
  error?: ApolloError
}

export interface IUser {
  id?: string
  name?: string | null
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
