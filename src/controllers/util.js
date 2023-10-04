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

/**
 * Filters out excluded fields (page, sort, limit, fields) from the Express query and replaces `gte`,
 * `gt`, `lte`, `lt` query operators with MongoDB equivalents - `$lte`, `$gt` and so on.
 * @param {string} expressQuery
 * @returns {string}
 */
const getMongoFilterQuery = (expressQuery) => {
  const mongoQuery = convertOperatorsToMongoSyntax(expressQuery);

  const filteredQuery = Object.keys(mongoQuery)
    .filter((field) => excludedFields.indexOf(field) === -1)
    .reduce((acc, curr) => ({ ...acc, [curr]: mongoQuery[curr] }), {});

  return filteredQuery;
};

/** 
 * Replaces commas in Express sort queries with spaces. 
 * 
 * For example, when called with `sort=-price,ratingsAverage` 
 * it will return `sort=-price ratingsAverage`
   @param {string} expressSortQuery
   @returns {string} The MongoDB-enabled query (containing spaces instead of commas)
*/
const getMongoSortQuery = (expressSortQuery) =>
  expressSortQuery.split(',').join(' ');

module.exports = { getMongoFilterQuery, getMongoSortQuery };
