const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/users');

const { NODE_ENV, JWT_SECRET } = process.env;

const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const UnauthError = require('../errors/UnauthError');
const EmailError = require('../errors/EmailError');
const { ERROR_MESSAGE } = require('../utils/consts');

const getUser = (req, res, next) => {
  const { _id } = req.user;
  User.findById(_id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(ERROR_MESSAGE.NOT_FOUND_USER);
      } else {
        res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
        });
      }
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    name,
    email,
    password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then((newUser) => res.status(201).send({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(ERROR_MESSAGE.BAD_REQUEST));
      } else if (err.code === 11000) {
        next(new EmailError(ERROR_MESSAGE.BUSY_EMAIL));
      } else {
        next(err);
      }
    });
};

const updateUserProfile = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, email }, { new: true, runValidators: true })
    .then((updateUser) => {
      if (!updateUser) {
        throw new NotFoundError(ERROR_MESSAGE.NOT_FOUND_USER);
      } else {
        res.send({
          _id: updateUser._id,
          name: updateUser.name,
          email: updateUser.email,
        });
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(ERROR_MESSAGE.BAD_REQUEST));
      } else if (err.code === 11000) {
        next(new EmailError(ERROR_MESSAGE.BUSY_EMAIL));
      } else {
        next(err);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthError(ERROR_MESSAGE.AUTH_FAILED);
      }
      return Promise.all([user, bcrypt.compare(password, user.password)]);
    })
    .then(([user, isLoggedIn]) => {
      if (!isLoggedIn) {
        throw new UnauthError(ERROR_MESSAGE.AUTH_FAILED);
      }
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: true,
        secure: true,
      });
      res.send({
        _id: user._id,
        name: user.name,
        email: user.email,
      });
    })
    .catch(next);
};

const logout = (req, res, next) => {
  try {
    res.clearCookie('jwt').send({ message: 'Выход' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getUser,
  createUser,
  updateUserProfile,
  login,
  logout,
};
