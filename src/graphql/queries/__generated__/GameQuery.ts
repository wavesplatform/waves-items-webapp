/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GameQuery
// ====================================================

export interface GameQuery_user {
  __typename: "User";
  id: string;
  address: string;
  name: string | null;
  image: any | null;
  meta: any | null;
  totalItems: number | null;
}

export interface GameQuery {
  user: GameQuery_user | null;
}

export interface GameQueryVariables {
  address: string;
}
