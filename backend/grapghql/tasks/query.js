const { typeDef: userTypeDefs } = require('./users/types');

exports.queryType = `#graphql
  extend type Query {
  getTaskAccessUser: [getTaskAccessUserResponse!]!
}

`;
