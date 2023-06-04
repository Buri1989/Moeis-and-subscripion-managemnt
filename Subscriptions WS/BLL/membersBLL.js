const { model } = require('mongoose');
const membersWS = require('../DAL/membersWS');

const fetchMembersDataIntoDB = async () => {
    const response = await membersWS.getAllMembers();
    let membersData = response.data;
    return membersData;
};

module.exports = { fetchMembersDataIntoDB };