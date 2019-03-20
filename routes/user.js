const express = require('express');
const user = require('../models/user');
const router = express.Router();
const jwt = require('jsonwebtoken');
// const env = require('../.env');
// const jwtSecret = env.JWT_SECRET || process.env.JWT_SECRET;

function checkToken(req, res, next) {
    const token = req.headers['x-access-token'];
    console.log(process.env.JWT_SECRET)

    jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
        if (err) {
            return res.status(500).json({
                errors: {
                    status: 500,
                    source: "/user",
                    title: "Database error",
                    detail: err.message
                }
            });
        }

        // Valid token send on the request
        next();
    });
}

router.get("/:id",
    (req, res, next) => checkToken(req, res, next),
    (req, res) => user.getUserDetails(res, req.params.id));

router.get("/stockpile/:id",
    (req, res, next) => checkToken(req, res, next),
    (req, res) => user.getUserStockpile(res, req.params.id));

router.get("/stockpile/item/:id/:user",
    (req, res, next) => checkToken(req, res, next),
    (req, res) => user.getUserStockpileItem(res, req.params.id, req.params.user));


// router.get('/:balance', (req, res) => balance.getReport(res, req.params.report));

module.exports = router;
