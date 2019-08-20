import { LONG } from '@waves/types'
import { ApolloError } from 'apollo-client'
import { ICreateParamsMap, IEditParamsMap } from '@waves/waves-games'
import { UserRole } from './__generated__/globalTypes'

export interface IDefaultResult {
  loading: boolean
  error?: ApolloError
}

export type UserImage = {
  icon: string
  page?: string
  promo?: string
}

export type GameMeta = {
  description?: string
  url?: string
}

// export type UserRole = 'USER' | 'TEST' | 'GAME'

export type WithImage<P = {}> = P & {
  image?: UserImage
}

export interface IUser extends WithImage {
  id?: string
  name?: string | null
  email?: string
  address: string
  publicKey?: string
  role?: UserRole
}

export interface IGame extends IUser {
  meta?: GameMeta
  totalItems?: number | null
}

export type ItemLot = {
  id: string
  lotId: string
  priceAsset: string
  price: LONG
  stock: LONG
  item?: IItem | null
  seller?: IUser | null
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
  imageUrl?: string | null
  storageImageUrl?: string | null
  createdAt?: string
  game: IGame
  lots?: ItemLot[] | null
}

export type WithBalance<P> = P & {
  balance?: number
}

export type MiscItem = { key: string, value: any }
export type ItemVersion = 1
export type CreateItemParams = ICreateParamsMap[ItemVersion]
export type EditItemParams = IEditParamsMap[ItemVersion]
