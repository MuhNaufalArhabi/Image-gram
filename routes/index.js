const route = require('express').Router()
// const login = require('./login')
// const user = require('./user')
route.use('/login', require('./login'))
route.use('/user', require('./user'))

module.exports = route