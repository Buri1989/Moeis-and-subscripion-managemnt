const { model } = require('mongoose');
const membersWS = require('../DAL/membersWS');

const fetchMembersDataIntoDB = async () => {
    const { data: membersData } = await membersWS.getAllMembers();
    return membersData;
};

module.exports = { fetchMembersDataIntoDB };