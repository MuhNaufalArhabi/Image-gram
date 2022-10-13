

const {User, Profile, Post, Tag} = require('../models')
const bcrypt = require('bcryptjs')


class Controller {
    static home(req, res) {
        res.render('home')
    }

    static profile(req, res) {
        const { id } = req.session.user
        Profile.findOne({
            include: User,
             where: { UserId: id }
            })
        .then(profile => {
            res.render('profile', { profile })
        })
        .catch(err => {
            res.send(err)
        })
    }

    static editProfileForm(req, res) {
        const { id } = req.session.user
        Profile.findOne({
            include: User,
             where: { UserId: id }
            })
        .then(profile => {
            res.render('edit-profile', { profile })
        })
        .catch(err => {
            res.send(err)
        })
    }


    static updateProfile(req, res) {
        const { id } = req.session.user
        const { firstName, lastName, dateOfBirth, phoneNumber, email } = req.body
        Profile.update({ firstName, lastName, dateOfBirth, phoneNumber, email }, {
            include: User,
            where: { UserId: id }
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