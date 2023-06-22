const express = require('express');
const moviesBLL = require('../BLL/moviesBLL');

const router = express.Router();

/*Entry point - 'http://localhost:8888/movies' */

//Get all movies
router.route('/').get(async (req, res) => {
    try {
        const filters = req.query;
        const movies = await moviesBLL.getAllMovies(filters);
        res.status(200).json(movies);
    } catch (err) {
        res.status(500).json(`The error is: ${err.message}`);
    }
});

//Get movie by id
router.route('/:id').get(async (req, res) => {
    try {
        const { id } = req.params;
        const movie = await moviesBLL.getMovieById(id);
        res.status(200).json(movie);
    } catch (err) {
        res.status(500).json(`The error is: ${err.message}`);
    }
});

//Add movie
router.route('/').post(async (req, res) => {
    try {
        const obj = req.body;
        const result = await moviesBLL.addMovie(obj);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(`The error is: ${err.message}`);
    }
});

//Update movie
router.route('/:id').put(async (req, res) => {
    try {
        const { id } = req.params;
        const obj = req.body;
        const result = await moviesBLL.updateMovie(id, obj);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(`The error is: ${err.message}`);
    }
});

//Delete movie
router.route('/:id').delete(async (req, res) => {
    try {
        const { id } = req.params;
        const result = await moviesBLL.deleteMovie(id);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(`The error is: ${err.message}`);
    }
});

module.exports = router;