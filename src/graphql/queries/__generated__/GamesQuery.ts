/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GamesQuery
// ====================================================

export interface GamesQuery_users {
  __typename: "User";
  id: string;
  address: string;
  name: string | null;
}

export interface GamesQuery {
  users: GamesQuery_users[];
}
