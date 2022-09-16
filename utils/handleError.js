const { ERROR_MESSAGE } = require('./consts');

const handleError = (err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500 ? ERROR_MESSAGE.INTERNAL_SERVER_ERROR : message,
  });
  next();
};
module.exports = handleError;
