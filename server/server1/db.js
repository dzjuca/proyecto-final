const db = require('mongoose');

db.Promise = global.Promise;

function connect(url) {
    db.connect(url, { useNewUrlParser: true });
    db.connection.on("error", console.error.bind(console, "MongoDB_Atlas connection error: "));
    db.connection.once("open", function () {
        console.log("MongoDB_Atlas_Pulso Connected successfully");
    });
}

module.exports = {
    connect:connect
};

// Poner en index.js
// const db = require('./db')
// db.connect(url)