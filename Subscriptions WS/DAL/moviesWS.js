const axios = require('axios');
const ModelMovies = require('../models/ModelMovies')

const getAllMovies = async () => {
    const { data: movies } = await axios.get('https://api.tvmaze.com/shows');

    movies.forEach(async (element) => {
        const obj = new ModelMovies({
            name: element.name,
            genres: element.genres,
            image: element.image.medium,
            premiered: element.premiered
        });
        await obj.save();
    });
}

module.exports = getAllMovies;