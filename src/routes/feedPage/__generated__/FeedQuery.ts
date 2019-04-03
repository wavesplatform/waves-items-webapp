/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FeedQuery
// ====================================================

export interface FeedQuery_items_game {
  __typename: "User";
  id: string;
  name: string;
  address: string;
}

export interface FeedQuery_items {
  __typename: "IItem";
  id: string;
  assetId: string;
  name: string;
  quantity: number;
  reissuable: boolean;
  timestamp: any;
  imageUrl: string;
  game: FeedQuery_items_game;
}

export interface FeedQuery {
  items: FeedQuery_items[];
}
