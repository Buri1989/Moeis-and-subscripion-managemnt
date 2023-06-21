const axios = require('axios');

const getAllMembers = async () => {
    return await axios.get('https://jsonplaceholder.typicode.com/users');
}

module.exports = { getAllMembers }