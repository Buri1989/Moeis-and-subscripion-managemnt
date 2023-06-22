const jsonFile = require('jsonfile');
const usersFile = '../data/users.json';

/*Read from users file */
const getUsersFromJsonFile = () => {
    try {
        return jsonFile.readFile(usersFile);
    } catch (err) {
        throw new Error(err.message);
    };
};

/*Write into users Json file*/
const setUsersIntoFile = async (obj) => {
    try {
        await jsonFile.writeFile(usersFile, obj);
        return 'Done'
    } catch (err) {
        throw new Error(err.message);
    }
};

module.exports = { getUsersFromJsonFile, setUsersIntoFile };