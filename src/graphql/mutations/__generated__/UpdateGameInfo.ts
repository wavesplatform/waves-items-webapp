/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { GameInfo } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateGameInfo
// ====================================================

export interface UpdateGameInfo_updateGameInfo {
  __typename: "User";
  id: string;
  address: string;
  name: string | null;
  image: any | null;
  meta: any | null;
  totalItems: number | null;
}

export interface UpdateGameInfo {
  updateGameInfo: UpdateGameInfo_updateGameInfo;
}

export interface UpdateGameInfoVariables {
  input: GameInfo;
}
