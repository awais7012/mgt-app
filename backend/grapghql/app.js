const { ApolloServer } = require('@apollo/server');
const gql = require('graphql-tag');


const { typeDef: userTypeDefs } = require('./users/types');
const { resolvers: userResolvers } = require('./users/resolvers');


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
  gql(userTypeDefs)
];

const combinedResolvers = {
  Query: {
    hello: () => 'Hello world!',
    ...userResolvers.Query,
  },
  Mutation: {
    ping: () => 'Pong!',
    ...userResolvers.Mutation,
  },
};

async function createGqlServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers: combinedResolvers,
  });
  await server.start();
  return server;
}

module.exports = createGqlServer;