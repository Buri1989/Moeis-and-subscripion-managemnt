const mongoose = require('mongoose');

/*Movies Schema */
const movieSchema = new mongoose.Schema(
    {
        Id: Number,
        Name: String,
        Genres: [String],
        Premiered: Date,
        Image: {
            medium: String,
            original: String,
        },
    },
    { versionKey: false }
);

const Movie = mongoose.model('movies', movieSchema);

module.exports = Movie;