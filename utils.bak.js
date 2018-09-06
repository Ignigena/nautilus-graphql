module.exports = {


  limitQuery(before, after) {
    if (!before && !after) return {};

    const filter = {
      _id: {},
    };

    if (before) {
      filter._id.$lt = before;
    }

    if (after) {
      filter._id.$gt = after;
    }

    return filter;
  },
  async pagination(query, { after, before, first, last, orderBy }) {
    let criteria = query.model.find().merge(query);
    let count = await query.model.find().merge(query).lean().limit(0).skip(0).count();

    if (orderBy) {
      query = query.sort(orderBy);
    }

    if (first || last) {
      let limit;
      let skip;

      if (first && count > first) {
        limit = first;
      }

      if (last) {
        if (limit && limit > last) {
          skip = limit - last;
          limit = limit - skip;
        } else if (!limit && count > last) {
          skip = count - last;
        }
      }

      if (skip) {
        query.skip(skip);
      }

      if (limit) {
        query.limit(limit);
      }
    }

    query = await query.merge(this.limitQuery(before, after));

    const startCursor = query.length && query[0]._id;
    const endCursor = query.length && query[query.length - 1]._id;

    const hasNext = endCursor && await criteria.model.find().merge(criteria).merge({ _id: { $gt: endCursor } }).lean().count();
    const hasPrevious = startCursor && await criteria.model.find().merge(criteria).merge({ _id: { $lt: startCursor } }).lean().count();

    return {
      pageInfo: {
        startCursor,
        endCursor,
        hasNextPage: Boolean(hasNext),
        hasPreviousPage: Boolean(hasPrevious),
      },
      edges: query,
      totalCount: count,
    };
  },
}
