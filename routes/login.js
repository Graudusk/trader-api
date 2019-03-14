const express = require('express');
const router = express.Router();
// const sqlite3 = require('sqlite3').verbose();
const db = require('../db/database');
// const db = new sqlite3.Database('./db/texts.sqlite');
const bodyParser = require("body-parser");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const trader = require('../models/trader');
const cors = require('cors');

router.use(bodyParser.json()); // for parsing application/json
router.use(bodyParser.urlencoded({ extended: true })); // for parsing application/

router.use(cors());

router.post("/", (req, res) => {
    let body = req.body;

    if (body !== null && body.email === null) {
        body = JSON.parse(body);
    }

    db.get("SELECT * FROM users WHERE email = ?",
        body.email,
        (err, row) => {
            if (err) {
                return trader.returnError(res, err, "/login", "Database error");
            }

            if (row && row.password) {
                bcrypt.compare(body.password, row.password, function(e, result) {
                    if (result) {
                        const payload = { email: row.email };
                        const secret = process.env.JWT_SECRET;

                        // console.log(secret);
                        const jwtToken = jwt.sign(payload, secret, { expiresIn: '24h' });
                        // const token = jwt.sign(payload, secret, { expiresIn: '1h'});

                        return res.status(200).json({
                            data: {
                                type: "success",
                                message: "User logged in",
                                user: payload,
                                token: jwtToken
                            }
                        });
                    } else {
                        return res.status(401).json({
                            errors: {
                                status: 401,
                                source: "/login",
                                title: "Wrong password",
                                detail: "Password is incorrect."
                            }
                        });
                    }
                });
            } else {
                return trader.returnError(
                    res,
                    {
                        message: "Wrong username or password"
                    },
                    "/login", "Database error",
                    401);
            }
        }
    );
    // res.status(500).json({ data: "No user with those credentials exist." });
});

module.exports = router;
