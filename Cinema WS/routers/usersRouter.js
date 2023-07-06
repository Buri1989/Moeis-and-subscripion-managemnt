const express = require('express');
const usersBLL = require('../BLL/usersBLL');
const jwt = require('jsonwebtoken');
const router = express.Router();
/*Entry point 'http://localhost:8000/users' */


/*Get all */
router.route('/').get(async (req, res) => {
    try {
        const users = await usersBLL.getAllUsersFromFilesAndDB();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json(`The error is: ${err.message}`)
    };
});

/*Get user by username */
router.route('/:username').get(async (req, res) => {
    try {
        const { username } = req.params;
        const user = await usersBLL.getAUserDataByUsername(username);
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(`The error is: ${err.message}`)
    };
});

/*POST - signup new user */
router.route('signup').post(async (req, res) => {
    try {
        const object = req.body;
        const result = await usersBLL.newUserSignUp(object);
        if (result === 0) {
            res.status(404).json({ message: 'Username does not exist in the database' });
        }
        if (result === 1) {
            res.status(409).json({ message: 'The username you entered already exist in the system' });
        };
        res.status(201).json(result);
    } catch (err) {
        res.status(500).json(`The error is: ${err.message}`)
    }
});

/*POST - Sign In */
router.route('/signin').post(async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        res.status(401).json({ message: 'Unauthorized,invalid credentials' });
    }
    try {
        const user = await usersBLL.getAUserDataByUsername(username);
        if (!user) {
            res.status(401).json({ message: 'Unauthorized,invalid username or password' });
        }
        if (password !== user.password) {
            res.status(401).json({ message: 'Unauthorized,invalid username or password' });
        } else {
            const userID = { userId: user._id };
            const ACCESS_SECRET_TOKEN = 'secretkey';
            const sessionTimeOut = user.sessionTimeOut;
            const expiration = Math.floor(Date.now() / 1000) + (sessionTimeOut * 60);
            const accessToken = jwt.sign({ id: userID }, ACCESS_SECRET_TOKEN, { expiresIn: expiration });
            res.status(200).json({ accessToken, expiration });
        };
    } catch (err) {
        res.status(500).json(`The error is: ${err.message}`)
    };
});

/*POST - Create new user */
router.route('/').post(async (req, res) => {
    try {
        const object = req.body;
        const result = await usersBLL.createNewUser(object);
        res.status(201).json(result);
    } catch (err) {
        res.status(500).json(`The error is: ${err.message}`)
    };
});

/*PUT - Update user */
router.route('/:id').put(async (req, res) => {
    try {
        const { id } = req.params;
        const object = req.body;
        const message = await usersBLL.updateMember(id, object);
        res.status(200).json(message)
    } catch (err) {
        res.status(500).json(`The error is: ${err.message}`)
    };
});

/*DELETE - Delete user */
router.route('/:id').delete(async (req, res) => {
    try {
        const { id } = req.params;
        const message = await usersBLL.deleteUser(id);
        res.status(200).json(message)
    } catch (err) {
        res.status(500).json(`The error is: ${err.message}`)
    };
});

module.exports = router;