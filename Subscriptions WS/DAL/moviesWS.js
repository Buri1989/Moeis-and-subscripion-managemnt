const axios = require('axios');
const modelMovies = require('../models/ModelMovies');

/*Getting the movies from the api and saving them in the DB */
const getAllMovies = async () => {
    const { data: movies } = await axios.get('https://api.tvmaze.com/shows');
    movies.forEach(async (movie) => {
        const object = new modelMovies({
            name: movie.name,
            genres: movie.genres,
            image: movie.image.medium,
            premiered: movie.premiered
        });
        await object.save();
    });
};

module.exports = { getAllMovies };