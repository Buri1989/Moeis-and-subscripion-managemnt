const movieWS = require('../DAL/moviesWS');
const Movie = require('../models/ModelMovies');

const fetchMoviesData = async () => {
    try {
        const response = await movieWS.getAllMovies();
        return response.data.map((show) => ({
            Id: show.id,
            Name: show.name,
            Genres: show.genres,
            Premiered: new Date(show.premiered),
            Image: {
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