const Movie = require('../models/movies');

const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');
const { ERROR_MESSAGE } = require('../utils/consts');

const getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.send(movies))
    .catch(next);
};

const addMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: req.user._id,
  })
    .then((movie) => res.status(201).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(ERROR_MESSAGE.BAD_REQUEST));
      } else {
        next(err);
      }
    });
};

const deleteMovie = (req, res, next) => {
  Movie.findById(req.params._id)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError(ERROR_MESSAGE.NOT_FOUND_MOVIE);
      } else if (String(movie.owner) !== req.user._id) {
        throw new ForbiddenError(ERROR_MESSAGE.FORBIDDEN_MOVIE);
      }
      return movie.remove()
        .then(() => {
          res.send({ message: ERROR_MESSAGE.DELETED_MOVIE });
        });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(ERROR_MESSAGE.BAD_REQUEST));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getMovies,
  addMovie,
  deleteMovie,
};
