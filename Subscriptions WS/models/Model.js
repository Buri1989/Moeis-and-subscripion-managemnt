const mongoose = require('mongoose');

/*Members Schema */
const memberSchema = new mongoose.Schema(
    {
        name: String,
        email: String,
        city: String
    },
    { versionKey: false }
);

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

//TODO: finish the Subscriptions Schema