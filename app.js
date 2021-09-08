const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const session = require('cookie-session')
const {url} = require('./config/keys')

// MongoDB
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})

const app = express()
const PORT = process.env.PORT || 5000

const index = require('./routers/index')
const authentication = require('./routers/authentication')
const dashboard = require('./routers/dashboard')

// PUG
app.set('view engine', 'pug')
app.set('views', './public/views')

// Use
app.use(session({
    name: 'session',
    keys: ['ID']
}))

app.use(bodyParser.urlencoded({extended: false}))
app.use('/public', express.static('public'))


// Routers
app.use('/', index)
app.use('/login', authentication)
app.use('/user', dashboard)


app.listen(PORT, () => {
    console.log(`Server is listening at: http://localhost:${PORT}`)
})

