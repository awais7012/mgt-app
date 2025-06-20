exports.typeDef = `#graphql
  type User {
    id: ID!
    firstName: String!
    lastName: String
    email: String!
    profileImageURL: String
  }

  input createTeamInput {
    teamName: String!
    teamLead: ID!
  }

  type CreateTeamResponse {
    success: Boolean!
    message: String!
    assignedTeamID:ID
  }

  extend type Mutation {
    createTeam(input: createTeamInput): CreateTeamResponse!
  }
`;
