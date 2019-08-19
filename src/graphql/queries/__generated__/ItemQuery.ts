/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { UserRole } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: ItemQuery
// ====================================================

export interface ItemQuery_item_game {
  __typename: "User";
  id: string;
  address: string;
  name: string | null;
  image: any | null;
  meta: any | null;
  totalItems: number | null;
}

export interface ItemQuery_item_lots_seller {
  __typename: "User";
  id: string;
  address: string;
  name: string | null;
  image: any | null;
  role: UserRole;
}

export interface ItemQuery_item_lots {
  __typename: "Lot";
  id: string;
  lotId: string;
  priceAsset: string;
  price: number;
  stock: number;
  seller: ItemQuery_item_lots_seller | null;
}

export interface ItemQuery_item {
  __typename: "Item";
  id: string;
  assetId: string;
  name: string;
  quantity: number;
  reissuable: boolean;
  timestamp: any;
  imageUrl: string | null;
  storageImageUrl: string | null;
  misc: any | null;
  game: ItemQuery_item_game;
  lots: ItemQuery_item_lots[] | null;
}

export interface ItemQuery {
  item: ItemQuery_item | null;
}

export interface ItemQueryVariables {
  assetId: string;
}
