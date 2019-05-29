/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { ItemFilter } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: ItemsQuery
// ====================================================

export interface ItemsQuery_items_game {
  id: string;
  name: string | null;
  address: string;
}

export interface ItemsQuery_items {
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

export interface ItemsQueryVariables {
  filter?: ItemFilter | null;
}
