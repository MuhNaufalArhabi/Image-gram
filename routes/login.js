const Controller = require('../controllers/controller')

const route = require('express').Router()

route.get('/', Controller.formLogin)
route.post('/', Controller.postLogin)

module.exports = route