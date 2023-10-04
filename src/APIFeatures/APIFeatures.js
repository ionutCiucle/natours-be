const { getMongoFilterQuery, replaceCommaWithSpace } = require('./util');

class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const filteredExpressQuery = getMongoFilterQuery(this.queryString);
    this.query = this.query.find(filteredExpressQuery);

    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const mongoSortQuery = replaceCommaWithSpace(this.queryString.sort);

      this.query = this.query.sort(mongoSortQuery);
    } else {
      this.query = this.query.sort('-createdAt');
    }

    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = replaceCommaWithSpace(this.queryString.fields);

      this.query = this.query.select(fields);
    }

    return this;
  }

  // Will be refactored to a nicer form :)
  // TODO: HAS BUG AND NEEDS LOVE AND ATTENTION
  paginate() {
    const page = +this.queryString.page || 1;
    const limitAmount = +this.queryString.limit || 100;
    const skipAmount = (page - 1) * limitAmount;

    this.query = this.query.skip(skipAmount).limit(limitAmount);

    return this;
  }
}

module.exports = APIFeatures;
