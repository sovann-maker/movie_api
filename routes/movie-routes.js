const express = require('express');
const {addMovie,
    getAllmovies,
    getMovie,
    updateMovie,
    deleteMovie
    } = require('../controllers/movieController');

const router = express.Router();

router.post('/movie', addMovie);
router.get('/movies', getAllmovies);
router.get('/movie/:id', getMovie);
router.put('/movie/:id', updateMovie);
router.delete('/movie/:id', deleteMovie);


module.exports = {
    routes: router
}