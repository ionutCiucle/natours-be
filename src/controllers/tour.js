const Tour = require('../models/tour');
const { HttpStatusCode, Status } = require('../enums');
const APIFeatures = require('../APIFeatures');

const getAllTours = async (req, res) => {
  try {
    const features = new APIFeatures(Tour.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const tours = await features.query;

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

const getTourStats = async (req, res) => {
  try {
    const stats = await Tour.aggregate([
      { $match: { ratingsAverage: { $gte: 4.5 } } },
      {
        $group: {
          _id: { $toUpper: '$difficulty' }, // when set to null, the group includes all docs
          num: { $sum: 1 }, // adds 1 to the amount for each document, as _id is set to null, so it includes every doc
          numRatings: { $sum: '$ratingsQuantity' },
          avgRating: { $avg: '$ratingsAverage' },
          avgPrice: { $avg: '$price' },
          minPrice: { $min: '$price' },
          maxPrice: { $max: '$price' },
        },
      },
      { $sort: { avgPrice: 1 } },
      { $match: { _id: { $ne: 'EASY' } } }, // not equal to
    ]);

    res.status(HttpStatusCode.Ok).json({
      status: Status.Success,
      data: {
        stats,
      },
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
  getTourStats,
};
