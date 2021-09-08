const {password, db} = require('./secret')

module.exports = {
    url: `mongodb+srv://admin:${password}@cluster0.5aqyn.mongodb.net/${db}?retryWrites=true&w=majority`
}
