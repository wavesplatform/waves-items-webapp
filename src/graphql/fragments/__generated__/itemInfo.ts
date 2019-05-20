/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: itemInfo
// ====================================================

export interface itemInfo_game {
  __typename: "User";
  id: string;
  name: string | null;
  address: string;
}

export interface itemInfo {
  __typename: "Item";
  id: string;
  assetId: string;
  name: string;
  quantity: number;
  reissuable: boolean;
  timestamp: any;
  imageUrl: string;
  game: itemInfo_game;
}
