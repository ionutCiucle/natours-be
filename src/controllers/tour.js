const Tour = require('../models/tour');
const { HttpStatusCode, Status } = require('../enums');

const getAllTours = async (req, res) => {
  try {
    const tours = await Tour.find();

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
