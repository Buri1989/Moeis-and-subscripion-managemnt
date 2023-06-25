const userFile = require('../DAL/userFile');
const permissionsFile = require('../DAL/permissionsFile');
const userModel = require('../models/userModel');

/*Get all users */
const getAllUsersFromFilesAndDB = async () => {
    try {
        const fullUserData = [];
        /*Get data from user DB */
        const userDataBaseData = await userModel.find({});
        /*Get data from users json file */
        const { users: personsFile } = await userFile.getUsersFromJsonFile();
        /*Get data from permissions json file */
        const { permissions: userPermissionFile } = await permissionsFile.getPermissionsFromFile();

        personsFile.forEach((per) => {
            const person = userDataBaseData.find((user) => user.id === per.id);
            const userPermissions = userPermissionFile.find((permission) => permission.id === per.id);
            const object = {
                id: person.id,
                role: person.role,
                username: person.username,
                firstName: per.firstName,
                lastName: per.lastName,
                sessionTimeOut: per.sessionTimeOut,
                createdData: per.createdData,
                permissions: userPermissions.permission,
            };
            fullUserData.push(object);
        });
    } catch (err) {
        throw new Error(`The error is: ${err.message}`);
    };
};

/*Get user data by username */
const getAUserDataByUsername = async (username) => {
    try {
        const fullUserData = [];
        /*Get data from user DB */
        const userDataBaseData = await userModel.find({});
        /*Get data from users json file */
        const { users: personsFile } = await userFile.getUsersFromJsonFile();
        /*Get data from permissions json file */
        const { permissions: userPermissionFile } = await permissionsFile.getPermissionsFromFile();

        const person = userDataBaseData.find((user) => user.username === username);
        const userPermissions = userPermissionFile.find((permission) => permission.id === person.id);
        const personDataFile = personsFile.find((person) => person.id === person.id)

        const userObject = {
            id: person.id,
            role: person.role,
            password: person.password,
            username: username,
            firstName: personDataFile.firstName,
            lastName: personDataFile.lastName,
            sessionTimeOut: personDataFile.sessionTimeOut,
            createdData: personDataFile.createdData,
            permissions: userPermissions.permission,
        };
        return userObject;
    } catch (err) {
        throw new Error(`The error is: ${err.message}`);
    };
};

/*Signup - POST */
const newUserSignUp = async (object) => {
    try {
        const countDocumentsFromDB = await userModel.countDocuments({});
        if (countDocumentsFromDB === 0) {
            const userDB = {
                username: object.username,
                password: object.password,
                role: 'admin',
            };
            const user = new userModel(userDB);
            await user.save();

            /*Pull data from DB into the json file(users) with the id from the DB */
            const data = await userModel.findOne({});
            const adminDB = data.find((person) => person.username === object.username);

            /*Create a new user in the json file(users) with the id from the DB */
            const newUserJson = {
                id: adminDB.id,
                firstName: 'firstName to update',
                lastName: 'lastName to update',
                sessionTimeOut: 60,
                createdData: new Date().toLocaleDateString('en-CA'),
            };
            /*Create new Permissions into the json file(permissions) with id from DB */
            const newPermissionJson = {
                id: adminDB._id,
                permissions: ['Create Subscriptions',
                    'Delete Subscriptions',
                    'Update Subscriptions',
                    'Create Movies',
                    'Delete Movies',
                    'Update Movies']
            };

            /*Save into usersFile = all users in json */
            const { users } = await userFile.getUsersFromJsonFile();
            users.push(newUserJson);
            await userFile.setUsersIntoFile({ users });

            /*Save into permissionFile */
            const { permissions } = await permissionsFile.getPermissionsFromFile();
            permissions.push(newPermissionJson);
            await permissionsFile.setPermissionsIntoFile({ permissions });
            return 'Admin data created successfully';
        } else {
            const userDocument = await userModel.findOne({ username: object.username });
            if (userDocument) {
                if (userDocument.password === '') {
                    const user = await userModel.findByIdAndUpdate(
                        { username: object.username },
                        { $set: { password: object, password } }, /*The $set operator replaces the value of a field with the specified value.*/
                        { new: true }
                    );
                    if (user) {
                        return 'User data created successfully'
                    } else {
                        return 0;
                    }
                }
            } else {
                return 1;
            }
        }
    } catch (err) {
        throw new Error(`The error is: ${err.message}`);
    };
};

/*POST - Create new user */
const createNewUser = async (object) => {
    try {
        /*Create a new user in the DB with username and password */
        const allData = await userModel.find({});
        const isAdmin = allData.find((person) => person.username === object.username);
        if (isAdmin === undefined) {
            const userDB = {
                username: object.username,
                password: '',
            };
            const newUserDB = new userModel.$where(userDB);
            await newUserDB.save();
        }

        /*Pull data from DB to get the ID */
        const userData = await userModel.find({});
        const personFromDB = userData.find((person) => person.username === object.username);

        /*Create new user in json file (users) with id from DB */
        const newUserJson = {
            id: personFromDB.id,
            firstName: object.firstName,
            lastName: object.lastName,
            sessionTimeOut: object.sessionTimeOut,
            createdData: object.createdData,
        };
        /*Create new permissions in json file with id from DB */
        const newPermissionJson = {
            id: personFromDB.id,
            permissions: object.permissions,
        };

        /*Save to userFile */
        const { users } = await userFile.getUsersFromJsonFile();
        users.push(newUserJson);
        await userFile.setUsersIntoFile({ users });
        /*Save into permissionFile */
        const { permissions } = await permissionsFile.getPermissionsFromFile();
        permissions.push(newPermissionJson);
        await permissionsFile.setPermissionsIntoFile({ permissions });

        return personFromDB.id;
    } catch (err) {
        throw new Error(`The error is: ${err.message}`);
    };
};

/*PUT - Update User*/
const updateMember = async (id, object) => {
    try {
        const userJson = {
            id: id,
            firstName: object.firstName,
            lastName: object.lastName,
            sessionTimeOut: object.sessionTimeOut,
            createdData: object.createdData,
        };
        const permissionJson = {
            id: id,
            permissions: object.permissions,
        };
        /*Get all the data from users json file */
        const { users } = await userFile.getUsersFromJsonFile();
        /*Get all the data from permissions json file */
        const { permissions } = await permissionsFile.getPermissionsFromFile();

        const usersIndex = users.findIndex((user) => user.id === id);
        const permissionsIndex = permissions.findIndex((permission) => permission.id === id);

        if (usersIndex !== -1) {
            users[usersIndex] = userJson;
            await userFile.setUsersIntoFile({ users });
            permissions[permissionsIndex] = permissionJson;
            await permissionsFile.setPermissionsIntoFile({ permissions });
            return 'Updated Done';
        }
        return 'Wrong ID';
    } catch (err) {
        throw new Error(`The error is: ${err.message}`);
    };
};

/*DELETE - Delete user from json files and DB */
const deleteUser = async (id) => {
    try {
        /*Delete from DB */
        await userModel.findByIdAndDelete(id);

        /*Delete from users json file */
        const { users } = await userFile.getUsersFromJsonFile();
        const usersIndex = users.findIndex((user) => user.id === id);
        if (usersIndex !== -1) {
            users.splice(usersIndex, 1);
            const updatedUserData = { users };
            await userFile.setUsersIntoFile(updatedUserData);
        };
        /*Delete user from permissions json file */
        const { permissions } = await permissionsFile.getPermissionsFromFile();
        const permissionsIndex = permissions.findIndex((permission) => permission.id === id);
        if (permissionsIndex !== -1) {
            permissions.splice(permissionsIndex, 1);
            const updatedPermissionsData = { permissions };
            await permissionsFile.setPermissionsIntoFile(updatedPermissionsData);
        };
        return 'User Deleted';
    } catch (err) {
        throw new Error(`The error is: ${err.message}`);
    };
};

module.exports = {
    getAllUsersFromFilesAndDB,
    getAUserDataByUsername,
    newUserSignUp,
    createNewUser,
    updateMember,
    deleteUser,
};