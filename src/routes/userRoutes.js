const express = require('express');
const router = express.Router();
const getAllUsers = require('../controllers/user.controllers');

router.get('/',getAllUsers);

module.exports = router