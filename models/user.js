const sqlite3 = require('sqlite3').verbose();
// const db = new sqlite3.Database('./db/texts.sqlite');
const db = require('../db/database');

module.exports = (function () {

    function returnError(res, err, source, title, status = 500) {
        return res.status(status).json({
            errors: {
                status: status,
                source: source,
                title: title,
                detail: err.message
            }
        });
    }

    function getUserDetails(res, id) {
        db.get("SELECT * FROM users WHERE id = ?;",
        id,
        (err, row) => {
            if (err) return returnError(res, err, "/user", "Database error");
            res.status(200).json({ data: row });
        });
    }

    function getUserStockpile(res, id) {
        db.all("SELECT stockpile.*, items.name, items.manufacturer, items.price FROM stockpile INNER JOIN items on stockpile.itemId = items.id WHERE user = ? ;",
        id,
        (err, row) => {
            if (err) return returnError(res, err, "/user/stockpile", "Database error");
            res.status(200).json({ data: row });
        });
    }

    function getUserStockpileItem(res, id, user) {
        db.get("SELECT stockpile.*, items.name, items.manufacturer, items.price FROM stockpile INNER JOIN items on stockpile.itemId = items.id WHERE stockpile.user = ? AND stockpile.id = ?;",
        user,
        id,
        (err, row) => {
            if (err) return returnError(res, err, "/user/stockpile/item", "Database error");
            res.status(200).json({ data: row });
        });
    }

    return {
        getUserDetails: getUserDetails,
        getUserStockpile: getUserStockpile,
        getUserStockpileItem: getUserStockpileItem
    };
}());
