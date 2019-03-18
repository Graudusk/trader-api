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
        console.log(id);
        db.get("SELECT * FROM users WHERE id = ?;",
        id,
        (err, row) => {
            if (err) return returnError(res, err, "/user", "Database error");
            console.log(row);
            res.status(200).json({ data: row });
        });
    }

    return {
        getUserDetails: getUserDetails
    };
}());
