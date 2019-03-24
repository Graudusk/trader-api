// const sqlite3 = require('sqlite3').verbose();
// const db = new sqlite3.Database('./db/texts.sqlite');
const db = require('../db/database');

function returnError(res, err, source, title, status = 500) {
    res.status(status).json({
        errors: {
            status: status,
            source: source,
            title: title,
            detail: err.message
        }
    });
}

function sellItem(res, body) {
    let itemStock;
    let itemPrice;
    let itemId;

    db.get(`SELECT *, s.quantity AS stock FROM stockpile AS s 
        INNER JOIN items AS i ON s.itemId = i.id WHERE s.id = ?; `, body.id, (err, row) => {
        if (err) {
            return returnError(res, err, "/item/sell", "Database error");
        }
        if (row === undefined) {
            return returnError(res, {
                message: "No such item"
            }, "/item/sell", "Database error");
        }
        itemPrice = body.price;
        itemStock = row.stock;
        itemId = row.itemId;

        updateSold(res, body, itemPrice, itemStock, itemId);
    });
}

function updateSold(res, body, itemPrice, itemStock, itemId) {
    db.serialize(() => {
        db.run("UPDATE users SET balance = balance + ? WHERE id = ?;",
            (itemPrice * itemStock),
            body.user,
            (err) => {
                if (err) {
                    return returnError(res, err, "/item/sell", "Database error");
                }
            }
        ).run("UPDATE items SET quantity = quantity + ? WHERE id = ?;",
            itemStock,
            itemId,
            (err) => {
                if (err) {
                    return returnError(res, err, "/item/sell", "Database error");
                }
            }
        ).run("DELETE FROM stockpile WHERE id = ?;",
            body.id,
            (err) => {
                if (err) {
                    return returnError(res, err, "/item/sell", "Database error");
                }
                res.status(201).json({ data: body });
            }
        );
    });
}

function buyItem(res, body) {
    if (body.quantity > 0) {
        db.serialize(() => {
            db.get("Select balance FROM users WHERE id = ?", body.user, (err, row) => {
                if (err) {
                    return returnError(res, err, "/item/buy", "Database error");
                } else if (row === undefined) {
                    return returnError(res, {
                        message: "No such item"
                    }, "/item/buy", "Database error");
                } else {
                    doBuyItem(res, body, row.balance, body.price);
                }
            });
        });
    } else {
        return returnError(res, { message: "Zero quantity given." }, "/item/buy", "User error");
    }
}

function doBuyItem(res, body, userBalance, itemPrice) {
    db.get("Select quantity FROM items WHERE id = ?", body.item, (err, row) => {
        if (err) {
            return returnError(res, err, "/item/buy", "Database error");
        }
        if (row === undefined) {
            return returnError(res, {
                message: "No such item"
            }, "/item/buy", "Database error");
        } else {
            let itemQuantity = row.quantity;

            if (itemQuantity - body.quantity < 0) {
                return returnError(res, {
                    message: "Not enough items in stock for purchase."
                }, "/item/buy", "User error");
            } else if (userBalance - (itemPrice * body.quantity) < 0) {
                return returnError(res, {
                    message: "Insufficient funds for purchase."
                }, "/item/buy", "User error");
            } else {
                updateStockpile(res, body, itemPrice);
            }
        }
    });
}

function updateStockpile(res, body, itemPrice) {
    db.serialize(() => {
        db.run("UPDATE users SET balance = balance - ? WHERE id = ?;",
            (itemPrice * body.quantity), body.user, (err) => {
                if (err) {
                    return returnError(res, err, "/item/buy", "Database error");
                }
            }
        ).run("UPDATE items SET quantity = quantity - ? WHERE id = ?;",
            body.quantity, body.item, (err) => {
                if (err) {
                    return returnError(res, err, "/item/buy", "Database error");
                }
            }
        ).run("INSERT INTO stockpile (itemId, user, quantity) VALUES (?, ?, ?);",
            body.item, body.user, body.quantity, (err) => {
                if (err) {
                    return returnError(res, err, "/item/buy", "Database error");
                }
            }
        ).get("SELECT balance FROM users WHERE id = ?;", body.user, (err, row) => {
            if (err) {
                return returnError(res, err, "/item/buy", "Database error");
            }
            res.status(201).json({ data: body, row: row });
        });
    });
}

function addMoney(res, body) {
    db.run("UPDATE users SET balance = balance + ? WHERE id = ?;",
        body.balance,
        body.id,
        (err) => {
            if (err) {
                return returnError(res, err, "/balance", "Database error");
            }
            res.status(201).json({ data: body });
        }
    );
}

function getItems(res) {
    db.all("SELECT * FROM items;",
        (err, row) => {
            if (err) {
                return returnError(res, err, "items/all", "Database error");
            }
            res.status(201).json({ data: row });
        }
    );
}

function getItemDetails(res, id) {
    db.get("SELECT * FROM items WHERE id = ?;",
        id,
        (err, row) => {
            if (err) {
                return returnError(res, err, "items/all", "Database error");
            }
            res.status(201).json({ data: row });
        }
    );
}


function randomAroundZero() {
    return Math.random() > 0.5 ? 1 : -1;
}


function randomVariance(variance) {
    return (Math.random() * variance * 10) * (Math.random() * variance * 10);
}

function getStockPrice(input) {
    let start = input.price ? input.price : input.startingprice;
    let rate = input.rate + randomVariance(input.variance);

    return Math.round(start + (rate * randomAroundZero()));
}

module.exports = {
    buyItem: buyItem,
    sellItem: sellItem,
    addMoney: addMoney,
    returnError: returnError,
    getItems: getItems,
    getItemDetails: getItemDetails,
    randomAroundZero: randomAroundZero,
    getStockPrice: getStockPrice
};
