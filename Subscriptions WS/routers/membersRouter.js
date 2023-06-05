const express = require('express');
const membersBLL = require('../BLL/membersBLL');
//const Member = require('../models/Model');

router = express.Router();

/*Entry Point 'http://localhost:8888/members'*/
router.route('/').get(async (req, res) => {
    try {
        const members = await membersBLL.storeMembersDataIntoDB();
        res.status(200).json(members);
    } catch (err) {
        res.status(500).json(`The error is: ${err.message}`);
    }
})

module.exports = router;