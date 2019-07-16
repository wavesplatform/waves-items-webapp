/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.


// ====================================================
// GraphQL query operation: ItemsQuery
// ====================================================

import { ItemFilter } from '../../../__generated__/globalTypes'

export interface ItemsQuery_items_game {
  __typename: "User";
  id: string;
  address: string;
  name: string | null;
  image: any | null;
}

export interface ItemsQuery_items {
  __typename: "ItemView";
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
