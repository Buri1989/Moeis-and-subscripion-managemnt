const express = require('express');
const subscriptionBLL = require('../BLL/subscriptionsBLL');


const router = express.Router();

/*Entry point - 'http://localhost:8888/subscriptions' */

//Get all subscriptions
router.route('/').get(async (req, res) => {
    try {
        const subscriptions = await subscriptionBLL.getAllSubscriptions();
        res.status(200).json(subscriptions);
    } catch (err) {
        res.status(500).json(`The error is: ${err.message}`);
    }
});

//Get subscription by id
router.route('/:id').get(async (req, res) => {
    try {
        const { id } = req.params;
        const subscription = await subscriptionBLL.getSubscriptionById(id);
        res.status(200).json(subscription);
    } catch (err) {
        res.status(500).json(`The error is: ${err.message}`);
    }

});

//Add subscription
router.route('/').post(async (req, res) => {
    try {
        const obj = req.body;
        const result = await subscriptionBLL.addSubscription(obj);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(`The error is: ${err.message}`);
    }
});

//Update subscription
router.route('/:id').put(async (req, res) => {
    try {
        const { id } = req.params;
        const obj = req.body;
        const result = await subscriptionBLL.updateSubscription(id, obj);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(`The error is: ${err.message}`);
    }
});

//Delete movie
router.route('/:id').delete(async (req, res) => {
    try {
        const { id } = req.params;
        const result = await subscriptionBLL.deleteSubscription(id);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(`The error is: ${err.message}`);
    }
});

module.exports = router;