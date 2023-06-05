const membersWS = require('../DAL/membersWS');
const Member = require('../models/ModelMembers');

const fetchMemberData = async () => {
    try {
        const response = await membersWS.getAllMembers();
        return response.data.map((member) => ({
            id: member.id,
            name: member.name,
            email: member.email,
            city: member.address.city,
        }))
    } catch (err) {
        console.log(err.message);
    }
};

const storeMembersData = async () => {
    const memberData = await fetchMemberData();
    return Member.insertMany(memberData);
};

module.exports = { fetchMemberData, storeMembersData };