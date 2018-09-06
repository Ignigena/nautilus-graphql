const { GraphQLDateTime } = require('graphql-iso-date');

module.exports = {
  DateTime: GraphQLDateTime,
  Node: {
    __resolveType(obj, context, info) {
      if (obj.uuid) {
        return 'Collection';
      }

      return null;
    },
    id: obj => obj._id,
  },
  OrderDirection: {
    ASC: 'asc',
    DESC: 'desc',
  },
  Query: {},
};
