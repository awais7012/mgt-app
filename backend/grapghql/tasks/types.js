exports.typeDef = `#graphql
scalar DateTime

type User {
    id: ID!
    firstName: String!
    lastName: String
    email: String!
    profileImageURL: String
}

type Team {
    id: ID!
    teamName: String!
    teamLead: User!
}

input CreateTaskInput {
    taskId: ID!
    taskName: String!
    taskDes: String!
    assignedBy: ID!
    assignedTo: ID!
    assignedTeamID: ID
}

type CreateTaskResponse {
    success: Boolean!
    message: String!
    assignedTeamID:ID
}

extend type Mutation {
    createTask(input: CreateTaskInput!): CreateTaskResponse!
},
extend type Query {
  getTaskAccessUser: [User!]!
}

`;


