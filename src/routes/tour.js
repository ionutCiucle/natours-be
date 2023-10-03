const express = require('express');
const {
  getAllTours,
  createTour,
  getTour,
  updateTour,
  deleteTour,
} = require('../controllers/tour');
// const {  checkId, checkBody } = require( './middleware.js';

const router = express.Router();

// router.param('id', checkId);

// router.route('/').get(getAllTours).post(checkBody, createTour);
router.route('/').get(getAllTours).post(createTour);
router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;
