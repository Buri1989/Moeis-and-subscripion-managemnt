const express = require('express');
const moviesBLL = require('../BLL/moviesBLL');

const router = express.Router();

/*Entry point : 'http://localhost:8888/movies' */
router.route('/').get(async (req, res) => {
    try {
        const movies = await moviesBLL.fetchMoviesDataIntoDB();
        res.status(200).json(movies);
    } catch (err) {
        res.status(500).json(`The error is: ${err.errmsg}`);
    }
});

module.exports = router;