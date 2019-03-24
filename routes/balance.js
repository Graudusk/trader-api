const express = require('express');
const trader = require('../models/trader');
const router = express.Router();
const jwt = require('jsonwebtoken');

function checkToken(req, res, next) {
    const token = req.headers['x-access-token'];

    jwt.verify(token, process.env.JWT_SECRET, function(err) {
        if (err) {
            return trader.returnError(res, err, "/balance", "Database error", 403);
        }

        // Valid token send on the request
        next();
    });
}

router.put("/",
    (req, res, next) => checkToken(req, res, next),
    (req, res) => trader.addMoney(res, req.body));

module.exports = router;
