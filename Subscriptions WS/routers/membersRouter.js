const express = require('express');
const membersBLL = require('../BLL/membersBLL');

router = express.Router();

/*Entry Point 'http://localhost:8888/members'*/
router.route('/').get(async (req, res) => {
    const members = await membersBLL.fetchMembersDataIntoDB();
    res.json(members);
})

module.exports = router;