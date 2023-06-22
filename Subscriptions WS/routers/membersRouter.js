const express = require('express');
const membersBLL = require('../BLL/membersBLL');

const router = express.Router();

/*Entry point - 'http://localhost:8888/members'  */
//Get all members
router.route('/').get(async (req, res) => {
    try {
        const member = await membersBLL.getAllMembers();
        res.status(200).json(member);
    } catch (err) {
        res.status(500).json(`The error is: ${err.message}`);
    }

});

//Get member by id
router.route('/:id').get(async (req, res) => {
    try {
        const { id } = req.params;
        const member = await membersBLL.getMemberById(id);
        res.status(200).json(member);
    } catch (err) {
        res.status(500).json(`The error is: ${err.message}`);
    }
})

//Add member
router.route('/').post(async (req, res) => {
    try {
        const obj = req.body;
        const result = await membersBLL.addMember(obj);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(`The error is: ${err.message}`);
    }

})

//Update member
router.route('/:id').put(async (req, res) => {
    try {
        const { id } = req.params;
        const obj = req.body;
        const result = await membersBLL.updateMember(id, obj);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(`The error is: ${err.message}`);
    }
})

//Delete member
router.route('/:id').delete(async (req, res) => {
    try {
        const { id } = req.params;
        const result = await membersBLL.deleteMember(id);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(`The error is: ${err.message}`);
    }

})
module.exports = router;