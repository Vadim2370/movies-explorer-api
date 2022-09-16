const router = require('express').Router();
const auth = require('../middlewares/auth');
const publicRouter = require('./public');
const userRouter = require('./users');
const movieRouter = require('./movies');
const NotFoundError = require('../errors/NotFoundError');
const { ERROR_MESSAGE } = require('../utils/consts');

router.use(publicRouter);
router.use(auth);
router.use(userRouter);
router.use(movieRouter);
router.use((req, res, next) => {
  next(new NotFoundError(ERROR_MESSAGE.NOT_FOUND_PAGE));
});

module.exports = router;
