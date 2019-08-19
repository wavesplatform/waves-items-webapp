/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { ItemFilter, UserRole } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: MoreItemsQuery
// ====================================================

export interface MoreItemsQuery_items_edges_node_game {
  __typename: "User";
  id: string;
  address: string;
  name: string | null;
  image: any | null;
  meta: any | null;
  totalItems: number | null;
}

export interface MoreItemsQuery_items_edges_node_lots_seller {
  __typename: "User";
  id: string;
  address: string;
  name: string | null;
  image: any | null;
  role: UserRole;
}

export interface MoreItemsQuery_items_edges_node_lots {
  __typename: "Lot";
  id: string;
  lotId: string;
  priceAsset: string;
  price: number;
  stock: number;
  seller: MoreItemsQuery_items_edges_node_lots_seller | null;
}

export interface MoreItemsQuery_items_edges_node {
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
  game: MoreItemsQuery_items_edges_node_game;
  lots: MoreItemsQuery_items_edges_node_lots[] | null;
}

export interface MoreItemsQuery_items_edges {
  __typename: "ItemEdge";
  cursor: string;
  node: MoreItemsQuery_items_edges_node;
}

export interface MoreItemsQuery_items_pageInfo {
  __typename: "PageInfo";
  hasNextPage: boolean;
  endCursor: string | null;
}

export interface MoreItemsQuery_items {
  __typename: "ItemConnection";
  edges: MoreItemsQuery_items_edges[] | null;
  pageInfo: MoreItemsQuery_items_pageInfo;
}

export interface MoreItemsQuery {
  items: MoreItemsQuery_items | null;
}

export interface MoreItemsQueryVariables {
  filter?: ItemFilter | null;
  after?: string | null;
  first?: number | null;
}
