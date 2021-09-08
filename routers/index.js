const express = require('express')
const bcrypt = require('bcrypt')
const {User} = require('../schemas')
const router = express.Router()

function isEmpty(array) {
    return array.length === 0
}

router.get('/',
    (req, res, next) => {
        if (req.session.ID)
            res.redirect('/user')
        else
            next()
    },
    (req, res) => {
        res.render('index')
    })

router.post('/', (req, res) => {
    const user = new User(req.body)
    User.find({email: user.email}, (err, users) => {
        if (!isEmpty(users)) {
            res.render('index', {cls: 'Red', msg: "User with given email already exists."})
        } else if (user.passwordConfirmation !== user.password) {
            res.render('index', {cls: 'Red', msg: "Passwords don't match"})
        } else {

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(user.password, salt, (err, hash) => {
                    user.password = hash
                    user.passwordConfirmation = hash

                    user.save()
                        .then(() => {
                            res.render('index', {cls: 'Green', msg: "Account created successfully."})
                        })
                        .catch(() => {
                            res.render('index', {cls: 'Red', msg: "Error occurred. Try again."})
                        })
                })
            })
        }
    })
})

module.exports = router