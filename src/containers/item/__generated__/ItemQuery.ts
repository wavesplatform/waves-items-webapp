/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ItemQuery
// ====================================================

export interface ItemQuery_item_game {
  __typename: "User";
  id: string;
  name: string;
  address: string;
}

export interface ItemQuery_item {
  __typename: "Item";
  id: string;
  assetId: string;
  name: string;
  quantity: number;
  reissuable: boolean;
  timestamp: any;
  imageUrl: string;
  game: ItemQuery_item_game;
}

export interface ItemQuery {
  item: ItemQuery_item | null;
}

export interface ItemQueryVariables {
  assetId: string;
}
