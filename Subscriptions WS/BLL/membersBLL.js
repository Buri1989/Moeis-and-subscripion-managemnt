const Members = require('../models/ModelMembers');

const getAllMembers = async () => {
    try {
        return await Members.find({});
    } catch (err) {
        throw new Error(err.message)
    }

}

// GET - Get By Id
const getMemberById = (id) => {
    try {
        return Members.findById({ _id: id });
    } catch (err) {
        throw new Error(err.message)
    }
};

// POST - Create in DB
const addMember = async (obj) => {
    try {
        const mem = new Members(obj);
        const savedMember = await mem.save();
        const newMemberId = savedMember._id;
        return newMemberId;
    } catch (err) {
        throw new Error(err.message)
    }

};

// PUT - Update
const updateMember = async (id, obj) => {
    try {
        await Members.findByIdAndUpdate(id, obj);
        return 'Member Updated!';
    } catch (err) {
        throw new Error(err.message)
    }

};

// DELETE - Delete
const deleteMember = async (id) => {
    try {
        await Members.findByIdAndDelete(id);
        return 'Member Deleted!';
    } catch (err) {
        throw new Error(err.message)
    }

};
module.exports = { getAllMembers, getMemberById, addMember, updateMember, deleteMember }