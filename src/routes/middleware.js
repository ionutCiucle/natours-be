const checkId = (req, res, next, val) => {
  if (req.params.id % 3 === 0) {
    res.status(400).json({ status: 'fail', message: 'Invalid ID' });
  } else {
    next();
  }
};

const checkBody = (req, res, next) => {
  const { name, price } = req.body;

  if (name === undefined || price === undefined) {
    res.status(400).send('No name or price specified');
  } else {
    next();
  }
};

const aliasTopTours = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';

  next();
};

module.exports = { checkId, checkBody, aliasTopTours };
