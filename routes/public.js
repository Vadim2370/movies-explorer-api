const router = require('express').Router();
const { login, createUser } = require('../controllers/users');
const { signInValidation, signUpValidation } = require('../middlewares/validation');

router.post('/signup', signUpValidation, createUser);
router.post('/signin', signInValidation, login);

module.exports = router;
