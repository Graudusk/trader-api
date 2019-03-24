DROP TABLE IF EXISTS users;
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY NOT NULL,
    email VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    password VARCHAR(60) NOT NULL,
    balance INT(20),
    UNIQUE(email)
);

    -- rate: 1.002,
    -- variance: 0.6,
    -- startingPoint: 20,
DROP TABLE IF EXISTS items;
CREATE TABLE IF NOT EXISTS items (
    id INTEGER PRIMARY KEY NOT NULL,
    name VARCHAR(255) NOT NULL,
    quantity INT(20) NOT NULL,
    manufacturer VARCHAR(255),
    startingprice INT(20),
    rate INT(20) NOT NULL,
    variance VARCHAR(255) NOT NULL
);

DROP TABLE IF EXISTS stockpile;
CREATE TABLE IF NOT EXISTS stockpile (
    id INTEGER PRIMARY KEY NOT NULL,
    itemId INTEGER NOT NULL,
    user INTEGER NOT NULL,
    quantity INT(20) NOT NULL
);


INSERT INTO users (email, name, password, balance) VALUES 
    ("test@test.com", "Sven Svensson",  "$2a$10$kqF0yrjU7YflcjPn6HpoyOylm1hxawY.c16Y/1QlMNjDgsvq9dHGy", "12001"),
    ("asdf@test.com", "Lars Lindström",  "$2a$10$kqF0yrjU7YflcjPn6HpoyOylm1hxawY.c16Y/1QlMNjDgsvq9dHGy", "12001");
INSERT INTO items (name, quantity, manufacturer, startingprice, rate, variance) 
    VALUES ("Macbook", "200", "Apple", "17000", "1.002", "1.6"),
    ("ZenBook", "5000", "ASUS", "15000", "1.002", "1.4"),
    ("Thinkpad", "200", "Lenovo", "12000", "1.002", "1.3"),
    ("Aspire", "200", "Acer", "14000", "1.002", "1.4"),
    ("Omen", "200", "HP", "16000", "1.002", "1.2");
