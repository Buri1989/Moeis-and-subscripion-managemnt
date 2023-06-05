const mongoose = require('mongoose');

/*Members Schema */
const memberSchema = new mongoose.Schema(
    {
        id: Number,
        Name: String,
        Email: String,
        City: String
    },
    { versionKey: false }
);

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

//TODO: finish the Subscriptions Schema

const Member = mongoose.model('members', memberSchema)
const Movie = mongoose.model('movies', movieSchema)

module.exports = Member;
module.exports = Movie;
