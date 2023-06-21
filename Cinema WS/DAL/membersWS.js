const axios = require('axios');

const fetchMembersWSData = async () => {
    try {
        return await axios.get('http://localhost:8888/members');
    } catch (err) {
        throw new Error(`This: ${err.message} occurred while getting info from members WS`);
    }
};

module.exports = { fetchMembersWSData };