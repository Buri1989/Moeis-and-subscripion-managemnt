const ModelSubscriptions = require('../models/ModelSubscriptions');

//Get All
const getAllSubscriptions = () => {
    try {

    } catch (err) {
        throw new Error(err.message)
    }
};

// GET - Get By Id
const getSubscriptionById = (id) => {
    try {
        return ModelSubscriptions.findById({ _id: id });
    } catch (err) {
        throw new Error(err.message)
    }
};

// POST - Create in DB
const addSubscription = async (obj) => {
    try {
        const allSubscriptions = await ModelSubscriptions.find({});
        const subscription = allSubscriptions.find((item) => item.memberId === obj.memberId);
        if (!subscription) {
            const sub = new ModelSubscriptions(obj);
            const newSub = await sub.save();
            return newSub;
        }
        else {
            const newMovie = {
                movieId: obj.movies.movieId,
                date: obj.movies.date
            }
            subscription.movies.push(newMovie);
            const sub = await subscription.save();
            return sub
        }
    } catch (err) {
        throw new Error(err.message)
    }
};

// PUT - Update Subscription 
const updateSubscription = async (id, obj) => {
    try {
        const allSubscriptions = await ModelSubscriptions.find({});
        allSubscriptions.map(async (sub) => {
            await ModelSubscriptions.updateOne({ memberId: sub.memberId }, { $pull: { movies: { movieId: id } } })
        })
        return ' Updated!';
    } catch (err) {
        throw new Error(err.message)
    }

};

// DELETE - Delete
const deleteSubscription = async (id) => {
    try {
        const allSubscriptions = await ModelSubscriptions.find({});
        const subscription = allSubscriptions.find((item) => item.memberId === id);
        await ModelSubscriptions.findByIdAndDelete(subscription._id);
        return ' Deleted!';
    } catch (err) {
        throw new Error(err.message)
    }

};
module.exports = { getAllSubscriptions, getSubscriptionById, addSubscription, updateSubscription, deleteSubscription }