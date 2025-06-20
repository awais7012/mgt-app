// # backend/grapghql/users/types.js
exports.typeDef = `#graphql
  type User {
    id: ID!
    firstName: String!
    lastName: String
    email: String!
    profileImageURL: String
  }
  type getTaskAccessUserResponse{
    userId:ID!
    user_role:String!
  }

  type CreateUserResponse {
    success: Boolean!
    message: String!
    token: String
    user_role:String
  }
  input CreateUserInput {
    userName: String!
    userRole: String!
    email: String!
    password: String!
  }
  input loginUserInput {
    email:String!,
    password:String!
  }
  type loginUserResponse{
    success: Boolean!
    message: String!
    token: String
    user_role:String
  }
  extend type Mutation {
    createUser(input: CreateUserInput!): CreateUserResponse!
  }
  extend type Mutation{
    loginUser(input:loginUserInput):loginUserResponse!
  }
`;
