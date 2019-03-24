const express = require('express');
const user = require('../models/user');
const router = express.Router();

router.get("/:id",
    (req, res, next) => user.checkToken(req, res, next),
    (req, res) => user.getUserDetails(res, req.params.id));

router.get("/stockpile/:id",
    (req, res, next) => user.checkToken(req, res, next),
    (req, res) => user.getUserStockpile(res, req.params.id));

router.get("/stockpile/item/:id/:user",
    (req, res, next) => user.checkToken(req, res, next),
    (req, res) => user.getUserStockpileItem(res, req.params.id, req.params.user));


// router.get('/:balance', (req, res) => balance.getReport(res, req.params.report));

module.exports = router;
