module.exports = `
  enum OrderDirection {
    ASC
    DESC
  }

  scalar DateTime

  schema {
    mutation: Mutation
    query: Query
  }

  interface Node {
    id: ID!
  }

  type PageInfo {
    endCursor: String
    hasNextPage: Boolean!
    hasPreviousPage: Boolean!
    startCursor: String
  }

  type Query
  type Mutation
`;
