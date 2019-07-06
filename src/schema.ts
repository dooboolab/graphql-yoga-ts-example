import { gql } from 'apollo-server';

const typeDefs = gql`
  type AuthPayload {
    token: String!
    user: User!
  }

  type User {
    id: ID!
    email: String!
    name: String!
  }

  type Message {
    id: Int!
    text: String!
    user: User!
  }

  type Query {
    user(id: ID!): User!
    users: [User!]!
  }

  type Mutation {
    signup(email: String!, password: String!, name: String!): AuthPayload!
    createMessage(text: String!): Boolean!
  }

  type Subscription {
    userAdded: User
  }
`;

export {
  typeDefs,
};
