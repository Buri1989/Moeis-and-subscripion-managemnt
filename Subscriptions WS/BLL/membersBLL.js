const Members = require('../models/ModelMembers');

const getAllMembers = async () => {
    //Get all data from WS and save in DB
    return Members.find({});
}

// GET - Get By Id
const getMemberById = (id) => {
    return Members.findById({ _id: id });
};

// POST - Create in DB
const addMember = async (obj) => {
    const mem = new Members(obj);
    const savedMember = await mem.save();
    const newMemberId = savedMember._id;
    return newMemberId;
};

// PUT - Update
const updateMember = async (id, obj) => {
    await Members.findByIdAndUpdate(id, obj);
    return 'Member Updated!';
};

// DELETE - Delete
const deleteMember = async (id) => {
    await Members.findByIdAndDelete(id);
    return 'Member Deleted!';
};
module.exports = { getAllMembers, getMemberById, addMember, updateMember, deleteMember }