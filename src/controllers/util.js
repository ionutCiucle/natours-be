const excludedFields = ['page', 'sort', 'limit', 'fields'];

// const convertOperatorsToMongoSyntax = (query) =>
//   query.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);x

const getFilteredQuery = (expressQuery) => {
  const filteredQuery = Object.keys(expressQuery)
    .filter((field) => excludedFields.indexOf(field) === -1)
    .reduce((acc, curr) => ({ ...acc, [curr]: expressQuery[curr] }), {});

  return filteredQuery;
};

module.exports = { getFilteredQuery };
