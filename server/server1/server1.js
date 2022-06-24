const express = require('express');
const app = express();
const server = require('http').Server(app);

const cors = require('cors');
const bodyParser = require('body-parser');
const socket = require('./socket');
const db = require('./db');
const router = require('./network/routes');

require("dotenv").config();
const url = process.env.MONGODB_URI;

db.connect(url);
app.use(cors());
app.use(bodyParser.json());
//app.use(express.json());
app.use(bodyParser.urlencoded({extended:false}));
socket.connect(server);
router(app)

app.use('/pulso', express.static('public'));
server.listen(8080, () => {
    console.log("La aplicación está escuchando en: http://localhost:8080")
})