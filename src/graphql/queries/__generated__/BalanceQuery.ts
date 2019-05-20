/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: BalanceQuery
// ====================================================

export interface BalanceQuery_balance_game {
  __typename: "User";
  id: string;
  name: string | null;
  address: string;
}

export interface BalanceQuery_balance {
  __typename: "Item";
  id: string;
  assetId: string;
  name: string;
  quantity: number;
  reissuable: boolean;
  timestamp: any;
  imageUrl: string;
  game: BalanceQuery_balance_game;
  balance: number | null;
}

export interface BalanceQuery {
  balance: BalanceQuery_balance[];
}

export interface BalanceQueryVariables {
  address: string;
}
