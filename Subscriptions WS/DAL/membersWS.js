const axios = require('axios');
const ModelMember = require('../models/ModelMembers');

const getAllMembers = async () => {
    const { data: members } = await axios.get('https://jsonplaceholder.typicode.com/users');
    members.forEach(async (user) => {
        const obj = new ModelMember({
            name: user.name,
            email: user.email,
            city: user.address.city
        });
        await obj.save();
    });

}
module.exports = getAllMembers;