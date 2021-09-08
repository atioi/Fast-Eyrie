const mongoose = require('mongoose')
const userSchema = require('./user')

// Schemas:
module.exports = {
    User: mongoose.model('User', userSchema)
}


