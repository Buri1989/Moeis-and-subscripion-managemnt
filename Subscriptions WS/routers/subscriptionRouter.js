const express = require('express');
const subscriptionBLL = require('../BLL/subscriptionsBLL');
const Movie = require('../models/ModelMovies');

const router = express.Router();

/*Entry point - 'http://localhost:8888/subscriptions' */
/*Get all movies and dates in the subscription collection */
router.route('/').get(async (req, res) => {
    try {
        const subscriptions = await subscriptionBLL.getAllDataFromSubscriptions();
        res.status(200).json(subscriptions);
    } catch (err) {
        res.status(500).json(`The error is: ${err.message}`);
    }
});

/*Get movies and dates in the subscription collection by member ID*/
router.route('/:memberId').get(async (req, res) => {
    try {
        const { memberId } = req.params;
        const movies = await subscriptionBLL.getMemberSubscriptionsById(memberId);
        res.status(200).json(movies);
    } catch (err) {
        res.status(500).json(`The error is: ${err.message}`);
    }
});

/*Add a movie and its date to a member's subscription */
router.route('/:memberId / add-movie').post(async (req, res) => {
    try {
        const { memberId } = req.params;
        const { movieId, date } = req.body;
        const message = await subscriptionBLL.addMovieToSubscription(memberId, movieId, date);
        res.status(200).json(message);
    } catch (err) {
        res.status(500).json(`The error is: ${err.message}`);
    }
});

/*Delete a movie and its date from member's subscription */
router.route('/:memberId/delete-movie/:movieId').delete(async (req, res) => {
    try {
        const { memberId, movieId } = req.params;
        const message = await subscriptionBLL.deleteMovieFromSubscription(memberId, movieId);
        res.status(200).json(message);
    } catch (err) {
        res.status(500).json(`The error is: ${err.message}`);
    }
})

module.exports = router;