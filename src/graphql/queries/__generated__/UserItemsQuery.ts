/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { UserRole } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: UserItemsQuery
// ====================================================

export interface UserItemsQuery_userItems_game {
  __typename: "User";
  id: string;
  address: string;
  name: string | null;
  image: any | null;
  meta: any | null;
  totalItems: number | null;
}

export interface UserItemsQuery_userItems_lots_seller {
  __typename: "User";
  id: string;
  address: string;
  name: string | null;
  image: any | null;
  role: UserRole;
}

export interface UserItemsQuery_userItems_lots {
  __typename: "Lot";
  id: string;
  lotId: string;
  priceAsset: string;
  price: number;
  stock: number;
  seller: UserItemsQuery_userItems_lots_seller | null;
}

export interface UserItemsQuery_userItems {
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
  game: UserItemsQuery_userItems_game;
  lots: UserItemsQuery_userItems_lots[] | null;
  balance: number | null;
}

export interface UserItemsQuery {
  userItems: UserItemsQuery_userItems[];
}

export interface UserItemsQueryVariables {
  address: string;
}
