const router = require('express').Router();
const { getUser, updateUserProfile, logout } = require('../controllers/users');
const { updateUserProfileValidation } = require('../middlewares/validation');

router.get('/users/me', getUser);
router.patch('/users/me', updateUserProfileValidation, updateUserProfile);
router.get('/signout', logout);

module.exports = router;
