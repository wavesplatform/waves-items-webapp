/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FeedQuery
// ====================================================

export interface FeedQuery_feed_game {
  __typename: "Game";
  name: string;
}

export interface FeedQuery_feed {
  __typename: "Item";
  id: string;
  name: string;
  game: FeedQuery_feed_game;
}

export interface FeedQuery {
  feed: FeedQuery_feed[];
}
