const User = require('../models/user.model.js')

const getAllUsers = async (req,res) => {
    const users = await User.find({})
    res.json(users);
}

module.exports = getAllUsers