const express = require('express');
const router = express.Router();
// const sqlite3 = require('sqlite3').verbose();
const db = require('../db/database');
// const db = new sqlite3.Database('./db/texts.sqlite');
const bodyParser = require("body-parser");
const bcrypt = require('bcryptjs');
const cors = require('cors');
const trader = require('../models/trader');
const saltRounds = 10;

router.use(bodyParser.json()); // for parsing application/json
router.use(bodyParser.urlencoded({ extended: true })); // for parsing application/

router.use(cors());

router.post("/", (req, res) => {
    const body = req.body;

    bcrypt.hash(body.password, saltRounds, function(err, hash) {
        // spara lösenord i databasen.
        db.run("INSERT INTO users (email, password, name) VALUES (?, ?, ?)",
            body.email,
            hash,
            body.name,
            (err) => {
                if (err) {
                    return trader.returnError(res, err, "/register", "Database error");
                }

                var message = {
                    message: "user " + body.email + " was created."
                };

                res.status(201).json({ data: message });
            }
        );
    });
});

module.exports = router;
