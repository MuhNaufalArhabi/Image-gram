const { User, Profile, Post, Tag } = require('../models')

class Controller {
    static home(req, res) {
        res.render('home')
    }

    static profile(req, res) {
        res.render('profile')
    }

    static editProfileForm(req, res) {
        User.findAll({
            include: Profile
        })
        .then(result => {
            res.render('edit-profile', { result })
        })
        .catch(err => {
            res.send(err)
        })
    }

    static updateProfile(req, res) {
        User.update({
            include: Profile
        })
        .then(result => {
            res.redirect('/user/profile')
        })
        .catch(err => {
            res.send(err)
        })
    }
}

module.exports = Controller