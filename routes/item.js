const express = require('express');
const trader = require('../models/trader');
const user = require('../models/user');
const router = express.Router();

router.get("/details/:id",
    (req, res, next) => user.checkToken(req, res, next),
    (req, res) => trader.getItemDetails(res, req.params.id));

router.get("/all",
    (req, res, next) => user.checkToken(req, res, next),
    (req, res) => trader.getItems(res));

router.post("/buy",
    (req, res, next) => user.checkToken(req, res, next),
    (req, res) => trader.buyItem(res, req.body));

router.post("/sell",
    (req, res, next) => user.checkToken(req, res, next),
    (req, res) => trader.sellItem(res, req.body));

module.exports = router;
