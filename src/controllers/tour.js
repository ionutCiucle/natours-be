const Tour = require('../models/tour');
const { HttpStatusCode, Status } = require('../enums');
const { getMongoFilterQuery, replaceCommaWithSpace } = require('./util');

const getAllTours = async (req, res) => {
  try {
    // Filter docs based on field values
    const filteredExpressQuery = getMongoFilterQuery(req.query);
    let query = Tour.find(filteredExpressQuery);

    // Custom sort or default sort
    if (req.query.sort) {
      const mongoSortQuery = replaceCommaWithSpace(req.query.sort);

      query = query.sort(mongoSortQuery);
    } else {
      query = query.sort('-createdAt');
    }

    // Select specific fields on the docs
    if (req.query.fields) {
      const fields = replaceCommaWithSpace(req.query.fields);

      query = query.select(fields);
    }

    // Pagination
    if (req.query.page && req.query.limit) {
      const skippedDocs = +req.query.page * +req.query.limit;

      query = query.skip(skippedDocs).limit(req.query.limit);
    } else {
      // Set default pagination
      query = query.limit(20);
    }

    const tours = await query;

    res.status(HttpStatusCode.Ok).json({
      status: Status.Success,
      data: {
        tours,
      },
    });
  } catch (err) {
    res.status(HttpStatusCode.InternalServerError).json({
      status: Status.Failure,
      message: err,
    });
  }
};

const getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);

    res.status(HttpStatusCode.Ok).json({
      status: Status.Success,
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(HttpStatusCode.InternalServerError).json({
      status: Status.Failure,
      message: err,
    });
  }
};

const createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);

    res.status(HttpStatusCode.Created).json({
      status: Status.Success,
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    if (err.name === 'MongoError') {
      res.status(HttpStatusCode.BadRequest).json({
        status: Status.Failure,
        message: err.errmsg,
      });
    } else {
      res.status(HttpStatusCode.InternalServerError).json({
        status: Status.Failure,
        message: err.message,
      });
    }
  }
};

const updateTour = async (req, res) => {
  try {
    const updatedTour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(HttpStatusCode.Ok).json({
      status: Status.Success,
      data: {
        tour: updatedTour,
      },
    });
  } catch (err) {
    res.status(HttpStatusCode.InternalServerError).json({
      status: Status.Failure,
      message: err,
    });
  }
};

const deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);

    res.status(HttpStatusCode.NoContent).json({
      status: Status.Success,
    });
  } catch (err) {
    res.status(HttpStatusCode.InternalServerError).json({
      status: Status.Failure,
      message: err,
    });
  }
};

module.exports = {
  createTour,
  getAllTours,
  getTour,
  updateTour,
  deleteTour,
};
