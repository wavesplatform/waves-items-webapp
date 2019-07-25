/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: StoreStatsQuery
// ====================================================

export interface StoreStatsQuery_storeStats {
  __typename: "StoreStats";
  games: number;
  items: number;
  transactions: number;
}

export interface StoreStatsQuery {
  storeStats: StoreStatsQuery_storeStats;
}
