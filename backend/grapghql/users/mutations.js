
exports.mutationType = `#graphql
  extend type Mutation {
    createUser(input: CreateUserInput!): CreateUserResponse!,
    loginUser(input:loginUserInput):loginUserResponse!
  }
`;
