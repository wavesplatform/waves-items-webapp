/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: UserItemsQuery
// ====================================================

export interface UserItemsQuery_userItems_game {
  __typename: "User";
  id: string;
  address: string;
  name: string | null;
  image: any | null;
}

export interface UserItemsQuery_userItems {
  __typename: "Item";
  id: string;
  assetId: string;
  name: string;
  quantity: number;
  reissuable: boolean;
  timestamp: any;
  imageUrl: string;
  game: UserItemsQuery_userItems_game;
  balance: number | null;
}

export interface UserItemsQuery {
  userItems: UserItemsQuery_userItems[];
}

export interface UserItemsQueryVariables {
  address: string;
}
