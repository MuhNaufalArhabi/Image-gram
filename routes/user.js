const Controller = require('../controllers/controller')
const route = require('express').Router()

route.get('/', Controller.home)
route.get('/profile', Controller.profile)
route.get('/profile/edit', Controller.editProfileForm)
route.post('/profile/edit', Controller.updateProfile)

module.exports = route