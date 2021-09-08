const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const {User} = require('../schemas')

router.get('/', (req, res) => {
    res.render('login')
})

router.post('/', (req, res, next) => {
    User
        .findOne({email: req.body.email})
        .then(user => {
            if (user) {
                bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
                    if (!isMatch) {
                        res.json('Nieprawidłowe hasło!')
                    } else {
                        req.session.ID = user.id
                        res.redirect('/user')
                    }
                })
            } else
                res.json('Nie ma takiego użytkownika')
        })
        .catch(err => {
            console.log(error)
        })
})

module.exports = router