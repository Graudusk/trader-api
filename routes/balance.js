const express = require('express');
const trader = require('../models/trader');
const router = express.Router();
const jwt = require('jsonwebtoken');

function checkToken(req, res, next) {
    const token = req.headers['x-access-token'];

    jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
        if (err) {
            if (err) return returnError(res, err, "/balance", "Database error");
        }

        // Valid token send on the request
        next();
    });
}

router.put("/",
    (req, res, next) => checkToken(req, res, next),
    (req, res) => trader.addMoney(res, req.body));



// router.get('/:balance', (req, res) => balance.getReport(res, req.params.report));

module.exports = router;
