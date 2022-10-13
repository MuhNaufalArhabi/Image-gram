const Controller = require('../controllers/controller')

const route = require('express').Router()

route.get('/', Controller.registerForm)
route.post('/', Controller.postRegister)

module.exports = route