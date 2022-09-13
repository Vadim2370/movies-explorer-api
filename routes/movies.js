const router = require('express').Router();
const { getMovies, addMovie, deleteMovie } = require('../controllers/movies');
const { addMovieValidation, movieIdValidation } = require('../middlewares/validation');

router.get('/movies', getMovies);
router.post('/movies', addMovieValidation, addMovie);
router.delete('/movies/:_id', movieIdValidation, deleteMovie);

module.exports = router;
