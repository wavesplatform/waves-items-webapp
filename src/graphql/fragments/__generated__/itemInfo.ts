/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: itemInfo
// ====================================================

export interface itemInfo_game {
  id: string;
  name: string | null;
  address: string;
}

export interface itemInfo {
  id: string;
  assetId: string;
  name: string;
  quantity: number;
  reissuable: boolean;
  timestamp: any;
  imageUrl: string;
  game: itemInfo_game;
}
