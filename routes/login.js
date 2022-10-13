const Controller = require('../controllers/controller')

const route = require('express').Router()

route.get('/', Controller.formLogin)
route.post('/', Controller.postLogin)
route.get('/logout', Controller.logout)

module.exports = route