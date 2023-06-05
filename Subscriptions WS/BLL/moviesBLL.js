const movieWS = require('../DAL/moviesWS');
const Movie = require('../models/Model');

const fetchMoviesData = async () => {
    try {
        const response = await movieWS.getAllMovies();
        return response.data.map((show) => ({
            id: show.id,
            name: show.name,
            genres: show.genres,
            premiered: new Date(show.premiered),
            image: {
                medium: show.image.medium,
                original: show.image.original,
            },
        }))
    } catch (err) {
        console.log(err.message);
    }
};

const storeMoviesData = async () => {
    const moviesData = await fetchMoviesData();
    return Movie.insertMany(moviesData);
};

module.exports = { fetchMoviesData, storeMoviesData };