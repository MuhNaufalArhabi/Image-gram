
const { publish } = require('../helpers/helpers')
const { User, Profile, Post, Tag } = require('../models')
const bcrypt = require('bcryptjs')
const { Op } = require('sequelize')


class Controller {
    static home(req, res) {
        let {user} = req.session
        let main = user
        const { search, tag} = req.query
        let option = {
            include: [
                {model: Tag},
                {model: User}
            ],
            order: [
                ['createdAt', 'DESC']
            ],
            where: {}
        }

        if (search){
            option.where.content = {
                    [Op.iLike] : `%${search}%`  
            }
        }

        if (tag) {
            if(tag == 'animal') option.where.TagId = 1
            if(tag == 'comedy') option.where.TagId = 2
            if(tag == 'food') option.where.TagId = 3
            if(tag == 'news') option.where.TagId = 4
        }
        Post.findAll(option)
            .then(post => {
                req.session.post = post
                res.render('home', { post,main, publish })
            })
            .catch(err => res.send(err))
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
        const {errors} = req.query

        Profile.findOne({
            include: User,
            where: { UserId: id }
        })
            .then(profile => {
                res.render('edit-profile', { profile, errors })
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
            .catch(err =>{
                let errors
                 if (err.name == 'SequelizeValidationError'){
                    errors = err.errors.map(el => {
                        return el.message
                    })
                    res.redirect(`/user/profile/edit?errors=${errors.join(',')}`)
                } else {
                    res.send(err)
                }
            })

    }

    static landingPage(req, res) {
        res.redirect('/login')
    }

    static formLogin(req, res) {
        const { errors } = req.query
        res.render('login', { errors })
    }

    static registerForm(req, res) {
        const {errors} = req.query
        res.render('signup', { errors } )
    }

    static logout(req, res) {
        req.session.destroy()
        res.redirect('/login')
    }

    static postRegister(req, res) {
        const { username, password, email, role, firstName, lastName, dateOfBirth, phoneNumber } = req.body

        User.create({ username, password, email, role })
            .then(result => {

                let userId = result.id
                return Profile.create({ firstName, lastName, dateOfBirth, phoneNumber, UserId: userId })
            })
            .then(() => {
                res.redirect('/login')
            })
            .catch(err =>{
                let errors
                 if (err.name == 'SequelizeValidationError'){
                    errors = err.errors.map(el => {
                        return el.message
                    })
                    res.redirect(`/signup?errors=${errors.join(',')}`)
                } else {
                    res.send(err)
                }
            })
    }

    static postLogin(req, res) {
        const { username, password } = req.body
        const errors = 'username or password wrong'
        User.findOne({
            where: { username }
        })
            .then(user => {
                if (user) {
                    const validPass = bcrypt.compareSync(password, user.password)

                    if (validPass) {
                        req.session.user = user
                        return res.redirect('/user')
                    } else {
                        return res.redirect(`/login?errors=${errors}`)
                    }
                } else {
                    return res.redirect(`/login?errors=${errors}`)
                }
            })
            .catch(err => res.send(err))
    }

    static postAdd(req, res) {
        res.redirect('/user')
    }

    static createPost(req, res) {
        const { id } = req.session.user
        const { title, content, imageURL, tag } = req.body
        Tag.findOne({ where: { name: tag } })
            .then(tag => {
                return Post.create({ title, content, imageURL, UserId: id, TagId: tag.id })
            })
            .then(() => {
                res.redirect('/user')
            })
            .catch(err => res.send(err))
    }

    static postLike(req, res) {
        const {id} = req.params
        Post.increment({'likes': 1}, {where: {id}})
            .then(() => {
                res.redirect('/user')
            })
            .catch(err => res.send(err))
    }

    static deletePost(req, res) {
        const {id} = req.params
        Post.destroy({
            where: {
                id
            }
        })
            .then(() => {
                res.redirect('/user')
            })
            .catch(err => res.send(err))

    }
}

module.exports = Controller