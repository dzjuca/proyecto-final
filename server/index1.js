const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

// models
const User = require('./models/user');

// settings
const port = process.env.PORT || 8080;

// app init
var app = express();

/* DataBase connection */
mongoose.connect(process.env.MONGODB_URI)
        .then(() => console.log('Connected to MongoDB-Atlas PulsoDatabase'))
        .catch((e) => console.error(e))

/* Middlewares */
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'OPTIONS,GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method == 'OPTIONS') {
        res.status(200).send();
    } else {
        next();
    }
});
app.use(express.static('../pulso/www')); 
app.use(bodyParser.json());
app.use(function (req, res, next) {
    console.log(req.method + ':' + req.url);
    if (!req.url.startsWith('/pulso') ||
        (req.url === '/pulso/sessions') ||
        (req.url === '/pulso/users' && req.method === 'POST')) {
        next();
    } else if (!req.query.token) {
        res.send(401, 'Token missing');
    } else {
        User.findOne({ _id:req.query.token })
            .then((data) => {
                if (!data) res.send(401, 'Invalid token');
                else next();
            })
            .catch((e) => {
                res.send(500);
                console.error(e);
            })
    }
});

/* login | sessions */
app.post('/pulso/sessions', function (req, res) {
    console.log('POST /pulso/sessions');
    if (!req.body.email || !req.body.password) res.send(400, 'Missing data');
    else {
        User.findOne({
            email: req.body.email,
            password: req.body.password
        })
            .then((data) => {
                if (!data) res.send(401);
                else res.send({ userId: data._id, token: data._id });
            })
            .catch((e) => res.json({message:e}).send(500))
    }
});

/* Users */
app.post('/pulso/users', (req, res) => {
    console.log('POST /pulso/users');
    if (!req.body.email ||
        !req.body.password ||
        !req.body.name) res.send(400, 'Missing data');
    else {
        const user = new User(req.body)
        user.save()
            .then((data) => res.json(data))
            .catch((e) => res.json({message:e}).send(500))
    }
});

app.listen(port, () => console.log('pulsoServer listening on port', port))