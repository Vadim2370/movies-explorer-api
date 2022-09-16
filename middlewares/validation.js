const { celebrate, Joi } = require('celebrate');
const { CHK_URL } = require('../utils/consts');

const signInValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

const signUpValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

const updateUserProfileValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().email().required(),
  }),
});

const movieIdValidation = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().hex().length(24),
  }),
});

const addMovieValidation = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().integer().positive().required(),
    year: Joi.string().pattern(/^\d{4}$/).required(),
    description: Joi.string().required(),
    image: Joi.string().uri().required().pattern(CHK_URL),
    trailerLink: Joi.string().uri().required().pattern(CHK_URL),
    thumbnail: Joi.string().uri().required().pattern(CHK_URL),
    movieId: Joi.number().integer().positive().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

module.exports = {
  signInValidation,
  signUpValidation,
  updateUserProfileValidation,
  movieIdValidation,
  addMovieValidation,
};
