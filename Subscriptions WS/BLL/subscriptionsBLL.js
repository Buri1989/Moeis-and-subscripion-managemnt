const ModelSubscriptions = require('../models/ModelSubscriptions');

//Get All
const getAllSubscriptions = () => {
    return ModelSubscriptions.find({});
}

// GET - Get By Id
const getSubscriptionById = (id) => {
    return ModelSubscriptions.findById({ _id: id });
};

// POST - Create in DB
const addSubscription = async (obj) => {
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

};
// PUT - Update Subscription 
const updateSubscription = async (id, obj) => {
    const allSubscriptions = await ModelSubscriptions.find({});
    allSubscriptions.map(async (sub) => {
        await ModelSubscriptions.updateOne({ memberId: sub.memberId }, { $pull: { movies: { movieId: id } } })
    })
    return ' Updated!';
};
// DELETE - Delete
const deleteSubscription = async (id) => {
    const allSubscriptions = await ModelSubscriptions.find({});
    const subscription = allSubscriptions.find((item) => item.memberId === id);
    await ModelSubscriptions.findByIdAndDelete(subscription._id);
    return ' Deleted!';
};
module.exports = { getAllSubscriptions, getSubscriptionById, addSubscription, updateSubscription, deleteSubscription }