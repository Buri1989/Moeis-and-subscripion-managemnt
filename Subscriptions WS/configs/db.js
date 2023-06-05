const mongoose = require('mongoose');

const connectDB = () => {
    mongoose.connect('mongodb://localhost:27017/subscriptionsDB', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() =>
        console.log('Connected to subscriptionsDB!')).catch((err) => console.log(err.message))
};

module.exports = connectDB