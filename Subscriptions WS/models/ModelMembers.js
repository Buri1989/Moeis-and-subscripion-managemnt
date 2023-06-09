const mongoose = require('mongoose');

/*Members Schema */
const memberSchema = new mongoose.Schema(
    {
        Id: Number,
        Name: String,
        Email: String,
        City: String,
    },
    { versionKey: false }
);

const Member = mongoose.model('members', memberSchema)

module.exports = Member;

