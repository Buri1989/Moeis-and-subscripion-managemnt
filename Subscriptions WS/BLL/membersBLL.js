//const { model } = require('mongoose');
const membersWS = require('../DAL/membersWS');
const { Member } = require('../models/Model');


const fetchMembersDataIntoDB = async () => {
    try {
        const { data: membersData } = await membersWS.getAllMembers();
        return membersData.map((member) => ({
            id: member.id,
            Name: member.name,
            Email: member.email,
            City: member.address.city,
        }));
    } catch (err) {
        console.log(err.message);
    }
};

const storeMembersDataIntoDB = async () => {
    try {
        const membersData = await fetchMembersDataIntoDB();
        return Member.create(membersData)
    }
    catch (err) {
        console.log(err.message);
    }
}
module.exports = { fetchMembersDataIntoDB, storeMembersDataIntoDB };