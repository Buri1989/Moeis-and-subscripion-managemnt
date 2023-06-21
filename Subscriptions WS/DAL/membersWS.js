const axios = require('axios');
const modelMembers = require('../models/ModelMembers');

/*Getting the members from the api and saving them in the DB */
const getAllMembers = async () => {
    const { data: members } = await axios.get('https://jsonplaceholder.typicode.com/users');
    members.forEach = (async (member) => {
        const object = new modelMembers({
            name: member.name,
            email: member.email,
            city: member.address.city
        });
        await object.save();
    })
}

module.exports = { getAllMembers }