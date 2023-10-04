const excludedFields = ['page', 'sort', 'limit', 'fields'];

const convertOperatorsToMongoSyntax = (queryString) => {
  const textQuery = JSON.stringify(queryString);
  const mongoTextQuery = textQuery.replace(
    /\b(gte|gt|lte|lt)\b/g,
    (match) => `$${match}`,
  );
  const mongoQuery = JSON.parse(mongoTextQuery);

  return mongoQuery;
};

/**
 * Filters out excluded fields (page, sort, limit, fields) from the Express query and replaces `gte`,
 * `gt`, `lte`, `lt` query operators with MongoDB equivalents - `$lte`, `$gt` and so on.
 * @param {string} queryString
 * @returns {string}
 */
const getMongoFilterQuery = (queryString) => {
  const mongoQuery = convertOperatorsToMongoSyntax(queryString);

  const filteredQuery = Object.keys(mongoQuery)
    .filter((field) => excludedFields.indexOf(field) === -1)
    .reduce((acc, curr) => ({ ...acc, [curr]: mongoQuery[curr] }), {});

  return filteredQuery;
};

const replaceCommaWithSpace = (expressSortQuery) =>
  expressSortQuery.split(',').join(' ');

module.exports = { getMongoFilterQuery, replaceCommaWithSpace };
