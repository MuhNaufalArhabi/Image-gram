const express = require('express')
const session = require('express-session')
const route = require('./routes')
const app = express()
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended : false}))
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: { 
        secure: false,
        sameSite: true
    }
}))
app.use(route)

app.listen(3000, () => {
    console.log('Running on port 3000')
})