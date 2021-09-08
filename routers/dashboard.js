const express = require('express')
const router = express.Router()

function isAuth(req, res, next) {
    if (!req.session.ID)
        res.redirect('login')
    else
        next()
}

router.get('/', isAuth, (req, res) => {
    res.render('dashboard')
})

router.get('/logout', (req, res) => {
    req.session = null
    res.redirect('/login')
})


module.exports = router