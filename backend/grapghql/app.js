const { ApolloServer } = require('@apollo/server');
const gql = require('graphql-tag');
const jwt = require('jsonwebtoken');
const SECRET = 'secretkey'
const { typeDef: userTypeDefs } = require('./users/types');
const { resolvers: userResolvers } = require('./users/resolvers');
const { typeDef: taskTypeDefs } = require('./tasks/types');
const { resolvers: taskResolvers } = require('./tasks/resolvers');

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
];

const combinedResolvers = {
  Query: {
    hello: () => 'Hello world!',
    ...userResolvers.Query,
    ...taskResolvers.Query,
  },
  Mutation: {
    ping: () => 'Pong!',
    ...userResolvers.Mutation,
    ...taskResolvers.Mutation,
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
