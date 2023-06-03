const Members = require('../models/Model');
const membersWS = require('../DAL/membersWS')

const getAllMembers = async () => {
    const resp = await membersWS.getAllMembers();

    const membersData = resp.data.map(member => ({
        _id: member.id,
        name: member.name,
        email: member.email,
        city: member.address.city
    }))

    const members = await Members.create(membersData)
    return members;
}

module.exports = { getAllMembers }