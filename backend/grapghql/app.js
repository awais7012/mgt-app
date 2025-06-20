const { ApolloServer } = require('@apollo/server');
const gql = require('graphql-tag');
const jwt = require('jsonwebtoken');
const SECRET = 'secretkey'
const { typeDef: userTypeDefs, typeDef } = require('./users/types');
const { resolvers: userResolvers } = require('./users/resolvers');
const { typeDef: taskTypeDefs } = require('./tasks/types');
const { resolvers: taskResolvers } = require('./tasks/resolvers');
const { typeDef: teamTypeDefs } = require('./teams/types')
const { resolvers: teamResolvers } = require('./teams/resolvers')
const baseTypeDefs = gql`
  type Query {
    hello: String
  }

  type Mutation {
    ping: String
  }
`;

const typeDefs = [
  baseTypeDefs,
  gql(userTypeDefs),
  gql(taskTypeDefs),
  gql(teamTypeDefs)
];

const combinedResolvers = {
  Query: {
    hello: () => 'Hello world!',         // Static dummy resolver
    ...userResolvers.Query,              // Queries from users module
    ...taskResolvers.Query,              // Queries from tasks module
    // ...teamResolvers.Query               // Queries from teams module (optional)
  },
  Mutation: {
    ping: () => 'Pong!',                 // Static dummy resolver
    ...userResolvers.Mutation,           // Mutations from users module
    ...taskResolvers.Mutation,           // Mutations from tasks module
    ...teamResolvers.Mutation            // Mutations from teams module
  },
};

async function createGqlServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers: combinedResolvers,


    context: async ({ req }) => {
      const token = req.headers.authorization || '';
      try {
        const decoded = jwt.verify(token, SECRET);
        return {
          userId: decoded.userId,
          userRole: decoded.userRole,
          email: decoded.email,
        };
      } catch (err) {
        console.warn('Invalid or missing token');
        return {};
      }
    }
  });

  await server.start();
  return server;
}

module.exports = createGqlServer;
