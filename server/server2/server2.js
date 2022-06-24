const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const userRoutes = require('./routes/user');

const app = express();
const port = process.env.PORT || 8080;

// Middelware
app.use(express.json());
app.use('/pulso', userRoutes);

// Routes
app.get('/', (req, res) => {
    res.send("Welcome to my API")
})

// Mongodb Connection
mongoose.connect(process.env.MONGODB_URI)
        .then(() => console.log('Connected to MongoDB-Atlas PulsoDatabase'))
        .catch((e) => console.error(e))

app.listen(port, () => console.log('pulsoServer listening on port', port))