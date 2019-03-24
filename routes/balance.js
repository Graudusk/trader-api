const express = require('express');
const trader = require('../models/trader');
const user = require('../models/user');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.put("/",
    (req, res, next) => user.checkToken(req, res, next),
    (req, res) => trader.addMoney(res, req.body));

module.exports = router;
