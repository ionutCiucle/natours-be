const excludedFields = ['page', 'sort', 'limit', 'fields'];

const convertOperatorsToMongoSyntax = (query) => {
  const textQuery = JSON.stringify(query);
  const mongoTextQuery = textQuery.replace(
    /\b(gte|gt|lte|lt)\b/g,
    (match) => `$${match}`,
  );
  const mongoQuery = JSON.parse(mongoTextQuery);

  return mongoQuery;
};

const getFilteredQuery = (expressQuery) => {
  const mongoQuery = convertOperatorsToMongoSyntax(expressQuery);

  const filteredQuery = Object.keys(mongoQuery)
    .filter((field) => excludedFields.indexOf(field) === -1)
    .reduce((acc, curr) => ({ ...acc, [curr]: mongoQuery[curr] }), {});

  return filteredQuery;
};

module.exports = { getFilteredQuery };
