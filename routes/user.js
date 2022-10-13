const Controller = require('../controllers/controller')
const route = require('express').Router()

route.get('/', Controller.home)
route.get('/profile', Controller.profile)
route.get('/profile/edit', Controller.editProfileForm)
route.post('/profile/edit', Controller.updateProfile)
route.get('/post/add', Controller.postAdd)
route.post('/post/add', Controller.createPost)
route.get('/post/:id/likes', Controller.postLike)
route.get('/post/:id/delete', Controller.deletePost)
module.exports = route