const mongoose = require('mongoose');

const connectDB = () => {
    mongoose.connect('mongodb://localhost:27017/usersDB', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() =>
        console.log('Connected to userDB!')).catch((err) => console.log(err.message))
};

module.exports = connectDB