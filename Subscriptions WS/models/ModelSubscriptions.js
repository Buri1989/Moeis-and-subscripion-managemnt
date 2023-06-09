const mongoose = require('mongoose');


const subscriptionSchema = new mongoose.Schema({
    MemberId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Member',
    },
    Movies: [{
        movieId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Movie'
        },
        date: Date,
    }]
}, { versionKey: false }
);

const Subscription = mongoose.model('subscription', subscriptionSchema);

module.exports = Subscription;