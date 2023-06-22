const jsonFile = require('jsonfile');
const perFile = '../data/permissions.json'


/*Read from file */
const getPermissionsFromFile = () => {
    try {
        return jsonFile.readFile(perFile);
    } catch (err) {
        throw new Error(err.message);
    }
};

/*Write into the file */
const setPermissionsIntoFile = async (obj) => {
    try {
        await jsonFile.writeFile(perFile, obj);
        return 'Done'
    } catch (err) {
        throw new Error(err.message);
    }
};

module.exports = { getPermissionsFromFile, setPermissionsIntoFile };