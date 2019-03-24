const express = require('express');
const user = require('../models/user');
const router = express.Router();

let check = (req, res, next) => user.checkToken(req, res, next);

router.use(check);

router.get("/:id",
    (req, res) => user.getUserDetails(res, req.params.id));

router.get("/stockpile/:id",
    (req, res) => user.getUserStockpile(res, req.params.id));

router.get("/stockpile/item/:id/:user",
    (req, res) => user.getUserStockpileItem(res, req.params.id, req.params.user));

module.exports = router;
