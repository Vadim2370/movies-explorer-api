const mongoose = require('mongoose');
const validator = require('validator');

const { ERROR_MESSAGE } = require('../utils/consts');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    require: true,
  },
  director: {
    type: String,
    require: true,
  },
  duration: {
    type: Number,
    require: true,
  },
  year: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    require: true,
    validate(image) {
      if (!validator.isURL(image)) {
        throw new Error(ERROR_MESSAGE.INCORRECT_LINK);
      }
    },
  },
  trailerLink: {
    type: String,
    require: true,
    validate(trailerLink) {
      if (!validator.isURL(trailerLink)) {
        throw new Error(ERROR_MESSAGE.INCORRECT_LINK);
      }
    },
  },
  thumbnail: {
    type: String,
    require: true,
    validate(thumbnail) {
      if (!validator.isURL(thumbnail)) {
        throw new Error(ERROR_MESSAGE.INCORRECT_LINK);
      }
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
