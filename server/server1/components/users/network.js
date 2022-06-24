const express = require('express');
const response = require('../../network/response');
const controller = require('./controller');
const router = express.Router();

router.post('/', (req, res) => {
    console.log('[components/users/network]: ')
    console.log(req.body)
    controller.addUser(req.body)
        .then(data => {
            response.success(req, res, data, 201);
        })
        .catch((e) => {
            response.error(req, res, 'InternalError', 500, e);
        })
});

module.exports = router