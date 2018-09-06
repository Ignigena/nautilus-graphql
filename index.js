const graphqlHTTP = require('express-graphql');
const { makeExecutableSchema } = require('graphql-tools');

let typeDefs = [require('./defaults/typeDefs')];
let resolvers = [require('./defaults/resolvers')];

module.exports = app => {
  let model = new app.Loader(app.api.path, '.graphql.js').all();
  Object.values(model).map(config => {
    resolvers.push(config.resolvers);
    typeDefs.push(config.schema);
  });

  app.use('/graphql', graphqlHTTP({
    schema: makeExecutableSchema({
      inheritResolversFromInterfaces: true,
      resolvers,
      typeDefs,
    }),
    graphiql: true,
    ...app.config.graphql,
  }));

  return require('./utils');
};
