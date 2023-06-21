const axios = require('axios');

const fetchMoviesWSData = async () => {
    try {
        return await axios.get('http://localhost:8888/movies');
    } catch (err) {
        throw new Error(`This: ${err.message} occurred while getting info from movies WS`);
    }
};

module.exports = { fetchMoviesWSData };