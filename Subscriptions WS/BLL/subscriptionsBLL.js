const ModelMembers = require('../models/ModelMembers');
const ModelMovies = require('../models/ModelMovies');
const ModelSubscriptions = require('../models/ModelSubscriptions');

/*Get all movies and dates in the subscription collection */
const getAllDataFromSubscriptions = async () => {
    try {
        return subscriptions = await ModelSubscriptions.find().populate('movies.movieId', 'name');
    } catch (err) {
        console.log(err.message);
    }
};

/* Get movies and dates in the subscription collection by member ID*/
const getMemberSubscriptions = async (memberId) => {
    try {
        return subscriptions = await ModelSubscriptions.findById({ memberId }).populate('movies.movieId', 'name');
        if (!subscriptions) {
            throw new Error('Subscription not found');
        }
    } catch (err) {
        throw new Error(err.message);
    }
};

/*Add a movie and its date to a member's subscription */
const addMovieToSubscription = async (memberId, movieId, date) => {
    try {
        const member = await ModelMembers.findById(memberId);
        const movie = await ModelMembers.findById(movieId);
        if (!member || !movie) {
            throw new Error('Member or movie not found');
        };

        const subscription = await ModelSubscriptions.findOne({ memberId });
        if (!subscription) {
            throw new Error('Subscription not found');
        }

        subscription.movies.push({ movieId, date });
        await subscription.save();

        return 'Movie added to subscription successfully';
    } catch (err) {
        throw new Error(`This: ${err.message} occurred while adding the movie to the subscription `);
    }
};

/*Delete a movie and its date from a member's subscription */
const deleteMovieFromSubscription = async (memberId, movieId) => {
    try {
        const subscription = await ModelSubscriptions.findOne({ memberId });
        if (!subscription) {
            throw new Error('Subscription not found');
        };

        const movieIndex = subscription.movies.findIndex((movie) => movie.movieId.toString() === movieId)

        if (movieIndex === -1) {
            throw new Error('Movie not found in subscription');
        };

        subscription.movies.splice(movieIndex, 1);
        await subscription.save();

        return 'Movie deleted from subscription successfully';
    } catch (err) {
        throw new Error(`This: ${err.message} occurred while adding the movie to the subscription `);
    }
};

module.exports = { getAllDataFromSubscriptions, getMemberSubscriptions, addMovieToSubscription, deleteMovieFromSubscription };