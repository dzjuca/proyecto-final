var express = require('express');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
require("dotenv").config();
const db = require('./db')
const url3 = process.env.MONGODB_URI;
db.connect(url3)

// Data Base
//var db = {};
var init = (url) => {
    //var url = 'mongodb://localhost:27017';
    console.log('- connecting to dabatase');
    MongoClient.connect(url, (err, client) => {
        if (err) {
            console.log(' - unable to open connection');
            process.exit();
        } else {
            console.log(' - connection Mongo-Atlas PulsoDatabase opened');
            db = client.db('pulsoDatabase');
        }
    });
};
//init(url3);

var app = express(); 

// mount middleware 
// - CORS 
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
        db.collection('users').findOne({ id: Number(req.query.token) }, (err, doc) => {
            if (err) res.send(500);
            else if (!doc) res.send(401, 'Invalid token');
            else next();
        });
    }
});
// define routes
// login | sessions
app.post('/pulso/sessions', function (req, res) {
    console.log('POST /pulso/sessions');
    if (!req.body.email || !req.body.password) res.send(400, 'Missing data');
    else {
        db.collection('users').findOne({
            email: req.body.email,
            password: req.body.password
        }, (err, doc) => {
            if (err) res.send(500);
            else if (!doc) res.send(401);
            else res.send({ userId: doc.id, token: Number(doc.id) });
        });
    }
});
// users 
app.post('/pulso/users', function (req, res) {
    console.log('POST /pulso/users');
    console.log(req.body.email)
    if (!req.body.email ||
        !req.body.password ||
        !req.body.name) res.send(400, 'Missing data');
    else {
        var user = {
            id: Date.now(),
            email: req.body.email,
            password: req.body.password,
            name: req.body.name
        };
        if (req.body.phone) user.phone = req.body.phone;
        if (req.body.birthday) user.birthday = req.body.birthday;
        db.collection('users').insertOne(user, (err, doc) => {
            if (err) res.send(500);
            else res.send(user);
        });
    }
});

/* ------------------------------------------------ */
app.get('/pulso/users/:userId', function (req, res) {
    console.log('GET /pulso/users/' + req.params.userId);
    var userId = req.params.userId;
    if (!userId) res.send(400, 'Missing parameter');
    else {
        db.collection('users').findOne({ id: Number(userId) }, (err, doc) => {
            if (err) res.send(500);
            else if (!doc) res.send(404, 'User not found');
            else {
                var user = {
                    id: doc.id,
                    email: doc.email,
                    name: doc.name,
                    surname: doc.surname
                };
                if (doc.avatar) user.avatar = doc.avatar;
                res.send(user);
            }
        });
    }
});

app.put('/pulso/users/:userId', function (req, res) {
    console.log('PUT /pulso/users/' + req.params.userId);
    var userId = req.params.userId;
    if (!userId) res.send(400, 'Missing parameter');
    else {
        db.collection('users').findOne({ id: Number(userId) }, (err, doc) => {
            if (err) res.send(500);
            else if (!doc) res.send(404, 'User not found');
            else {
                var user = {
                    id: doc.id,
                    name: req.body.name || doc.name,
                    surname: req.body.surname || doc.surname,
                    email: req.body.email || doc.email,
                    password: req.body.password || doc.password
                };
                if (req.body.avatar || doc.avatar) user.avatar = req.body.avatar || doc.avatar;
                if (req.body.position || doc.position) user.position = req.body.position || JSON.parse(doc.position);
                db.collection('users').updateOne({ id: Number(userId) }, { $set: user }, (err, doc) => {
                    if (err) res.send(500, err);
                    else res.send(user);
                });
            }
        });
    }
});
app.delete('/pulso/users/:userId', function (req, res) {
    console.log('DELETE /pulso/users/' + req.params.userId);
    var userId = req.params.userId;
    if (!userId) res.send(400, 'Missing parameter');
    else {
        db.collection('users').deleteOne({ id: Number(userId) }, (err, result) => {
            if (err) res.send(500, err);
            else res.send(204);
        });
    }
});
// posts

// products

// * ------------------------------------- * //
app.listen(8080); 
console.log('HTTP server Mongo running');
