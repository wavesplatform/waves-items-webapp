/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ItemsQuery
// ====================================================

export interface ItemsQuery_items_game {
  __typename: "User";
  id: string;
  name: string | null;
  address: string;
}

export interface ItemsQuery_items {
  __typename: "Item";
  id: string;
  assetId: string;
  name: string;
  quantity: number;
  reissuable: boolean;
  timestamp: any;
  imageUrl: string;
  game: ItemsQuery_items_game;
}

export interface ItemsQuery {
  items: ItemsQuery_items[];
}
