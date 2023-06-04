const moviesWS = require('../DAL/moviesWS');

const fetchMoviesDataIntoDB = async () => {
    const { data: moviesData } = await moviesWS.getAllMovies();
    return moviesData;
};

module.exports = { fetchMoviesDataIntoDB };