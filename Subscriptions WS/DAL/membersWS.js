const axios = require('axios');

const membersUrl = 'https://jsonplaceholder.typicode.com/users'

const getAllMembers = () => {
    return axios.get(membersUrl)
}

module.exports = { getAllMembers }