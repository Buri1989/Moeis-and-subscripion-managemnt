const express = require('express');
const subscriptionBLL = require('../BLL/subscriptionsBLL');


const router = express.Router();

/*Entry point - 'http://localhost:8888/subscriptions' */

//Get all subscriptions
router.route('/').get(async (req, res) => {
    const subscriptions = await subscriptionBLL.getAllSubscriptions();
    res.json(subscriptions);
});

//Get subscription by id
router.route('/:id').get(async (req, res) => {
    const { id } = req.params;
    const subscription = await subscriptionBLL.getSubscriptionById(id);
    res.json(subscription);
})

//Add subscription
router.route('/').post(async (req, res) => {
    const obj = req.body;
    const result = await subscriptionBLL.addSubscription(obj);
    res.json(result);
})

//Update subscription
router.route('/:id').put(async (req, res) => {
    const { id } = req.params;
    const obj = req.body;
    const result = await subscriptionBLL.updateSubscription(id, obj);
    res.json(result);
})

//Delete movie
router.route('/:id').delete(async (req, res) => {
    const { id } = req.params;
    const result = await subscriptionBLL.deleteSubscription(id);
    res.json(result);
})
module.exports = router;