const ModelMembers = require('../models/ModelMembers');
const ModelMovies = require('../models/ModelMovies');
const ModelSubscriptions = require('../models/ModelSubscriptions');

/*Get all movies and dates in the subscription collection */
const getAllDataFromSubscriptions = async () => {
    try {
        return subscriptions = await ModelSubscriptions.find().populate('Movies.movieId', 'Name');
    } catch (err) {
        console.log(err.message);
    }
};

/* Get movies and dates in the subscription collection by member ID*/
const getMemberSubscriptions = async (MemberId) => {
    try {
        return subscriptions = await ModelSubscriptions.findById({ MemberId }).populate('Movies.movieId', 'Name');
        if (!subscriptions) {
            throw new Error('Subscription not found');
        }
    } catch (err) {
        throw new Error(err.message);
    }
};

/*Add a movie and its date to a member's subscription */
const addMovieToSubscription = async (MemberId, movieId, date) => {
    try {
        const member = await ModelMembers.findById(MemberId);
        const movie = await ModelMovies.findById(movieId);
        if (!member || !movie) {
            throw new Error('Member or movie not found');
        };

        const subscription = await ModelSubscriptions.findOne({ MemberId });
        if (!subscription) {
            throw new Error('Subscription not found');
        }

        subscription.Movies.push({ movieId, date });
        await subscription.save();

        return 'Movie added to subscription successfully';
    } catch (err) {
        throw new Error(`This: ${err.message} occurred while adding the movie to the subscription `);
    }
};

/*Delete a movie and its date from a member's subscription */
const deleteMovieFromSubscription = async (MemberId, movieId) => {
    try {
        const subscription = await ModelSubscriptions.findOne({ MemberId });
        if (!subscription) {
            throw new Error('Subscription not found');
        };

        const movieIndex = subscription.Movies.findIndex((movie) => movie.movieId.toString() === movieId)

        if (movieIndex === -1) {
            throw new Error('Movie not found in subscription');
        };

        subscription.Movies.splice(movieIndex, 1);
        await subscription.save();

        return 'Movie deleted from subscription successfully';
    } catch (err) {
        throw new Error(`This: ${err.message} occurred while adding the movie to the subscription `);
    }
};

module.exports = { getAllDataFromSubscriptions, getMemberSubscriptions, addMovieToSubscription, deleteMovieFromSubscription };