/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { UserRole } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: MoreUserLotsQuery
// ====================================================

export interface MoreUserLotsQuery_userLots_edges_node_seller {
  __typename: "User";
  id: string;
  address: string;
  name: string | null;
  image: any | null;
  role: UserRole;
}

export interface MoreUserLotsQuery_userLots_edges_node_item_game {
  __typename: "User";
  id: string;
  address: string;
  name: string | null;
  image: any | null;
  meta: any | null;
  totalItems: number | null;
}

export interface MoreUserLotsQuery_userLots_edges_node_item {
  __typename: "Item";
  id: string;
  assetId: string;
  name: string;
  quantity: number;
  reissuable: boolean;
  timestamp: any;
  imageUrl: string | null;
  storageImageUrl: string | null;
  misc: any | null;
  game: MoreUserLotsQuery_userLots_edges_node_item_game;
}

export interface MoreUserLotsQuery_userLots_edges_node {
  __typename: "Lot";
  id: string;
  lotId: string;
  priceAsset: string;
  price: number;
  stock: number;
  seller: MoreUserLotsQuery_userLots_edges_node_seller | null;
  item: MoreUserLotsQuery_userLots_edges_node_item;
}

export interface MoreUserLotsQuery_userLots_edges {
  __typename: "LotEdge";
  cursor: string;
  node: MoreUserLotsQuery_userLots_edges_node;
}

export interface MoreUserLotsQuery_userLots_pageInfo {
  __typename: "PageInfo";
  hasNextPage: boolean;
  endCursor: string | null;
}

export interface MoreUserLotsQuery_userLots {
  __typename: "LotConnection";
  edges: MoreUserLotsQuery_userLots_edges[] | null;
  pageInfo: MoreUserLotsQuery_userLots_pageInfo;
}

export interface MoreUserLotsQuery {
  userLots: MoreUserLotsQuery_userLots | null;
}

export interface MoreUserLotsQueryVariables {
  address: string;
  after?: string | null;
  first?: number | null;
}
