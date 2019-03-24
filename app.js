const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const index = require('./routes/index');
const register = require('./routes/register');
const login = require('./routes/login');
const balance = require('./routes/balance');
const item = require('./routes/item');
const user = require('./routes/user');
const trader = require('./models/trader');
const db = require('./db/database');
const port = 1338;
const WebSocket = require('ws');
const bodyParser = require("body-parser");


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== 'test') {
    app.use(morgan('combined'));
}

let items;

db.all("SELECT * FROM items;",
    (err, row) => {
        if (err) {
            console.log(err);
        }
        items = row;
    }
);

app.use((req, res, next) => {
    // console.log(items)
    console.log(req.method);
    console.log(req.path);
    next();
});

app.use('/', index);
app.use('/register', register);
app.use('/login', login);
app.use('/balance', balance);
app.use('/item', item);
app.use('/user', user);

app.use((req, res, next) => {
    var err = new Error("Not Found");

    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }
    res.status(err.status || 500).json({
        "errors": [
            {
                "status": err.status,
                "title":  err.message,
                "detail": err.message
            }
        ]
    });
});



setInterval(function () {
    items = items.map((item) => {
        item["price"] = trader.getStockPrice(item);
        return item;
    });
}, 5000);


// Start up server
// const server = app.listen(port, () => console.log(`Me API listening on port ${port}!`));
const server = app.listen(port, () => {
    console.log(`Server is listening on ${port}`);
    // console.log(`DSN is: ${dsn}`);
});
// const server = app.listen(port, () => console.log(`Example app listening on port ${port}!`));

const wss = new WebSocket.Server({ server }, "json");

wss.on("connection", (ws/*, req*/) => {
    console.log("Connection received.");
    // console.log(req);
    // items.map((item) => {
    //     item["price"] = trader.getStockPrice(item);
    //     return item;
    // });
    // console.log(ws.OPEN);

    console.log(items);
    if (ws.OPEN === 1) {
        ws.send(JSON.stringify(items));
    }


    // console.log(ws.readyState)
    let echo = setInterval(function () {
        // items.map((item) => {
        //     item["price"] = trader.getStockPrice(item);
        //     return item;
        // });
        // console.log(ws.OPEN);

        console.log(items);
        if (ws.OPEN === 1) {
            ws.send(JSON.stringify(items));
        }
    }, 5000);

    ws.on("message", (message) => {
        console.log("Received: %s", message);
        ws.send(message);
    });

    ws.on("error", (error) => {
        console.log(`Server error: ${error}`);
    });

    ws.on("close", (code, reason) => {
        clearInterval(echo);
        console.log(`Closing connection: ${code} ${reason}`);
    });
});

module.exports = server;
