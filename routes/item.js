const express = require('express');
const trader = require('../models/trader');
const router = express.Router();
const jwt = require('jsonwebtoken');

function checkToken(req, res, next) {
    const token = req.headers['x-access-token'];

    jwt.verify(token, process.env.JWT_SECRET, function(err) {
        if (err) {
            return res.status(403).json({
                errors: {
                    status: 403,
                    source: "/balance",
                    title: "Database error",
                    detail: err.message
                }
            });
        }

        // Valid token send on the request
        next();
    });
}

router.get("/details/:id",
    (req, res, next) => checkToken(req, res, next),
    (req, res) => trader.getItemDetails(res, req.params.id));

router.get("/all",
    (req, res, next) => checkToken(req, res, next),
    (req, res) => trader.getItems(res));

router.post("/buy",
    (req, res, next) => checkToken(req, res, next),
    (req, res) => trader.buyItem(res, req.body));

router.post("/sell",
    (req, res, next) => checkToken(req, res, next),
    (req, res) => trader.sellItem(res, req.body));




// router.get('/:balance', (req, res) => balance.getReport(res, req.params.report));

module.exports = router;
