

const {User, Profile, Post, Tag} = require('../models')
const bcrypt = require('bcryptjs')


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

    static landingPage(req, res){
        res.redirect('/login')
    }

    static formLogin(req, res){
        const { errors } = req.query
        res.render('login', {errors})
    }

    static registerForm(req, res) {
        res.render('signup')
    }

    static postRegister(req, res) {
        const {username, password, email, role, firstName, lastName, dateOfBirth, phoneNumber} = req.body

        User.create({username, password, email, role})
            .then(result => {

                let userId = result.dataValues.id
                return Profile.create({firstName, lastName, dateOfBirth, phoneNumber, UserId: userId})
            })
            .then(result => {
                res.redirect('/login')
            })
            .catch(err => res.send(err))
    }

    static postLogin (req, res) {
        const {username, password} = req.body
        const errors = 'username or password wrong'
        User.findOne({
            where: { username }
        })
            .then(user => {
                if(user){
                    const validPass = bcrypt.compareSync(password, user.password)

                    if(validPass){
                        req.session.user = user
                       return res.redirect('/user')
                    } else {
                        return res.redirect(`/login?errors=${errors}`)
                    }   
                }else{
                    return res.redirect(`/login?errors=${errors}`)
                }
            })
            .catch(err => res.send(err))
    }



}

module.exports = Controller