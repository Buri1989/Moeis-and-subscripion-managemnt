const mongoose = require('mongoose');

/*Movies Schema */
const movieSchema = new mongoose.Schema(
    {
        id: Number,
        name: String,
        genres: [String],
        premiered: Date,
        image: {
            medium: String,
            original: String,
        },
    },
    { versionKey: false }
);

const Movie = mongoose.model('movies', movieSchema);

module.exports = Movie;