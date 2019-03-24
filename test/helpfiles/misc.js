process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test';

const db = require('../../db/database');

function prepare() {
    db.serialize(() => {
        db.run("DELETE FROM users", (err) => {
            if (err) {
                console.error("Could not empty test DB users", err.message);
            }
        }).run(`
INSERT INTO users (email, password, name, balance) VALUES ("test@test.com",
"$2a$10$7P3dxy.BxyOkjaYW9pNsb.cuZ0R9b0jtMNhye3KywDKKyp2nlxwoi", "namn", "1000000")`);
    });
}


module.exports = { prepare: prepare };
