const express = require('express');
const moviesBLL = require('../BLL/moviesBLL');

const router = express.Router();

router.route('/').get(async (req, res) => {
    try {
        const movies = await moviesBLL.storeMoviesData();
        res.status(200).json(movies)
    } catch (err) {
        res.status(500).json(`The error is: ${err.message}`);
    }
});

module.exports = router;