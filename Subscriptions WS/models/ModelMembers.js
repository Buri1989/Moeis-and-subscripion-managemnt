const mongoose = require('mongoose');

/*Members Schema */
const memberSchema = new mongoose.Schema(
    {
        id: Number,
        name: String,
        email: String,
        city: String,
    },
    { versionKey: false }
);

const Member = mongoose.model('members', memberSchema)

module.exports = Member;

