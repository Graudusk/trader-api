var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) { // eslint-disable-line no-unused-vars
    const data = {
        description: "Welcome to trader!", // eslint-disable-line max-len
    };

    return res.json(data);
});

module.exports = router;
