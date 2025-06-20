export const typeDefs = `#graphql
    type User {
        id: ID!
        firstName: String!
        lastName: String
        email: String!
        profileImageURL: String
    },
    input createTeam:{
        teamId:ID!
        teamName:String!
        teamLead:String!
    }
    type CreateTeamResponse:{
        success:Boolean!
        message:String!
    }

    extend type Mutation:{
        
    }
`;