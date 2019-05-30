/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GamesQuery
// ====================================================

export interface GamesQuery_games {
  __typename: "User";
  id: string;
  address: string;
  name: string | null;
  image: any | null;
}

export interface GamesQuery {
  games: GamesQuery_games[];
}
