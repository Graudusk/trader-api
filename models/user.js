const db = require('../db/database');
const trader = require('../models/trader');
const jwt = require('jsonwebtoken');

function getUserDetails(res, id) {
    db.get(` SELECT users.*, COUNT(stockpile.id) AS stock FROM users
LEFT JOIN stockpile ON stockpile.user = users.id WHERE users.id = ?; `,
        id, (err, row) => {
            if (err) {
                return trader.returnError(res, err, "/user", "Database error");
            }
            res.status(200).json({ data: row });
        });
}

function getUserStockpile(res, id) {
    db.all(`
SELECT
    stockpile.*,
    items.name,
    items.manufacturer
FROM
    stockpile
INNER JOIN
    items on stockpile.itemId = items.id
WHERE
    user = ?;
        `,
        id,
        (err, row) => {
            if (err) {
                return trader.returnError(res, err, "/user/stockpile", "Database error");
            }
            res.status(200).json({ data: row });
        });
}

function getUserStockpileItem(res, id, user) {
    db.get(`
SELECT
    stockpile.*,
    items.name,
    items.manufacturer
FROM
    stockpile
INNER JOIN
    items on stockpile.itemId = items.id
WHERE
    stockpile.user = ? AND stockpile.id = ?;
        `,
        user,
        id,
        (err, row) => {
            if (err) {
                return trader.returnError(res, err, "/user/stockpile/item", "Database error");
            }
            res.status(200).json({ data: row });
        });
}

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
module.exports = {
    getUserDetails: getUserDetails,
    getUserStockpile: getUserStockpile,
    getUserStockpileItem: getUserStockpileItem,
    checkToken: checkToken
};
