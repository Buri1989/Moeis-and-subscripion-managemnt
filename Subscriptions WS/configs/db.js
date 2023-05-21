const mongoose = require('mongoose');

const connectDB = () => {
    mongoose.connect('mongodb://localhost:27017/subscriptionsDB').then(() =>
        console.log('Connected to subscriptionsDB!')).catch((error) => console.log(error.errmsg))
};

module.exports = connectDB