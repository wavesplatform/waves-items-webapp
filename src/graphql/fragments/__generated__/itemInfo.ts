/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: itemInfo
// ====================================================

export interface itemInfo_game {
  __typename: "User";
  id: string;
  address: string;
  name: string | null;
  image: any | null;
  meta: any | null;
  totalItems: number | null;
}

export interface itemInfo {
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
  game: itemInfo_game;
}
