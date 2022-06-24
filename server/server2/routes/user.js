const express = require('express');
const userSchema = require('../models/user')
const router = express.Router();

// Create user
router.post('/users', (req, res) => {
    const user = userSchema(req.body)
    user.save()
        .then((data) => res.json(data)).catch((e) => res.json({message:e}))
});

module.exports = router;