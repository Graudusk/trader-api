const express = require('express');
const user = require('../models/user');
const router = express.Router();
const jwt = require('jsonwebtoken');

function checkToken(req, res, next) {
    const token = req.headers['x-access-token'];

    jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
        if (err) {
            return res.status(500).json({
                errors: {
                    status: 500,
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

router.get("/:id",
    (req, res, next) => checkToken(req, res, next),
    (req, res) => user.getUserDetails(res, req.params.id));


// router.get('/:balance', (req, res) => balance.getReport(res, req.params.report));

module.exports = router;
