const route = require('express').Router()
const Controller = require('../controllers/controller')
const login = require('./login')
const user = require('./user')
const signup = require('./signup')

const valid = (req, res, next) => {
    if (!req.session.userId){
        res.riderect('/')
    } else {
        next()
    }
}

route.get('/', Controller.landingPage)
route.use('/login', login)
route.use('/user',valid, user)
route.use('/signup', signup)

module.exports = route