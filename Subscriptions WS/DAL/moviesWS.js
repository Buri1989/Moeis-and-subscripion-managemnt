const axios = require('axios');

const moviesUrl = 'https://api.tvmaze.com/shows'

const getAllMovies = () => {
    return axios.get(moviesUrl)
}