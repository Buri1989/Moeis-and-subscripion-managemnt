const Member = require('../models/ModelMembers');

/*GET - Get all members */
const getAllMembers = async () => {
    try {
        return await Member.find({})
    } catch (err) {
        console.log(err.message)
    }
};

/*GET - Get member by Id */
const getMemberById = async (id) => {
    try {
        return await Member.findById({ _id: id })
    } catch (err) {
        console.log(err.message);
    }
};

/*POST - Create member in DB */
const addNewMember = async (object) => {
    try {
        const member = new Member(object);
        const savedMember = await member.save();
        const newMemberId = savedMember._id;
        return newMemberId;
    } catch (err) {
        console.log(err.message);
    };
};

/*PUT - Update member */
const updateExistingMember = async (id, object) => {
    try {
        await Member.findByIdAndUpdate(id, object)
        return 'Updated';
    } catch (err) {
        console.log(err.message)
    }
};

/*DELETE - Delete member */
const deleteMember = async (id) => {
    try {
        await Member.findByIdAndDelete(id);
        return 'Deleted'
    } catch (err) {
        console.log(err.message)
    }
};



module.exports = { getAllMembers, getMemberById, addNewMember, updateExistingMember, deleteMember };