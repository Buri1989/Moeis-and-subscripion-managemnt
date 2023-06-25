const express = require('express');
const usersBLL = require('../BLL/usersBLL');
const jwt = require('jsonwebtoken');

const router = express.Router();

/*Entry point 'http://localhost:8000/users' */
