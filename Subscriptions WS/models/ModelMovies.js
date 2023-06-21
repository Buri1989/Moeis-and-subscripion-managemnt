const mongoose = require('mongoose');

/*Movies Schema */
const movieSchema = new mongoose.Schema(
    {
        name: String,
        genres: [String],
        image: String,
        premiered: Date
    },
    { versionKey: false }
);

const Movie = mongoose.model('movies', movieSchema);

module.exports = Movie;