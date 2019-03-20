DROP TABLE IF EXISTS users;
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY NOT NULL,
    email VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    password VARCHAR(60) NOT NULL,
    balance INT(20),
    UNIQUE(email)
);

DROP TABLE IF EXISTS items;
CREATE TABLE IF NOT EXISTS items (
    id INTEGER PRIMARY KEY NOT NULL,
    name VARCHAR(255) NOT NULL,
    quantity INT(20) NOT NULL,
    manufacturer VARCHAR(255),
    price INT(20)
);

DROP TABLE IF EXISTS stockpile;
CREATE TABLE IF NOT EXISTS stockpile (
    id INTEGER PRIMARY KEY NOT NULL,
    itemId INTEGER NOT NULL,
    user INTEGER NOT NULL,
    quantity INT(20) NOT NULL
);


INSERT INTO users (email, name, password, balance) VALUES ("test@test.com", "Sven Svensson",  "$2a$10$kqF0yrjU7YflcjPn6HpoyOylm1hxawY.c16Y/1QlMNjDgsvq9dHGy", "12001");
INSERT INTO items (name, quantity, manufacturer, price) 
    VALUES ("Macbook", "200", "Apple", "19000"),
    ("ZenBook", "5000", "ASUS", "15000"),
    ("Thinkpad", "200", "Lenovo", "16000"),
    ("Aspire", "200", "Acer", "10000"),
    ("Omen", "200", "HP", "11000");
