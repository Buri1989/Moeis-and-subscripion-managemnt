const express = require('express');
const membersBLL = require('../BLL/membersBLL');

const router = express.Router();

router.route('/').get(async (req, res) => {
    try {
        const members = await membersBLL.storeMembersData();
        res.status(200).json(members);
    } catch (err) {
        res.status(500).json(`The error is: ${err.message}`);
    }
});

module.exports = router;