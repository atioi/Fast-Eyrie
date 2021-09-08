const mongoose = require('mongoose')
module.exports = new mongoose.Schema({
    username: String,
    lastname: String,
    email: String,
    password: String,
    passwordConfirmation: String
})