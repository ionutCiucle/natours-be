import mongoose from 'mongoose';

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a price'],
    unique: true,
  },
  duration: {
    type: Number,
    required: [true, 'A tour must have a duration'],
  },
  difficulty: {
    type: String,
    default: 'easy',
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price'],
  },
});

const Tour = mongoose.model('Tour', tourSchema);

export default Tour;
