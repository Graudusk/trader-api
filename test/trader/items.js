"use strict";
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test';

/* global describe it before */
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../app.js');
const db = require("../../db/database.js");

let jwtoken;

chai.should();
chai.use(chaiHttp);

describe('Items 403 paths', () => {
    describe('GET /item/all', () => {
        it('403 UNAUTHORIZED', (done) => {
            chai.request(server)
                .get("/item/all")
                .end((err, res) => {
                    res.should.have.status(403);

                    done();
                });
        });
    });

    describe('GET /item/details/1', () => {
        it('403 UNAUTHORIZED', (done) => {
            chai.request(server)
                .get("/item/details/1")
                .end((err, res) => {
                    res.should.have.status(403);

                    done();
                });
        });
    });

    describe('POST /item/buy', () => {
        it('403 UNAUTHORIZED', (done) => {
            chai.request(server)
                .post("/item/buy")
                .end((err, res) => {
                    res.should.have.status(403);

                    done();
                });
        });
    });

    describe('POST /item/sell', () => {
        it('403 UNAUTHORIZED', (done) => {
            chai.request(server)
                .post("/item/sell")
                .end((err, res) => {
                    res.should.have.status(403);

                    done();
                });
        });
    });
});

describe('Login', () => {
    before(() => {
        db.serialize(() => {
            db.run("DELETE FROM users", (err) => {
                if (err) {
                    console.error("Could not empty test DB users", err.message);
                }
            }).run(`
INSERT INTO users (email, password, name, balance)
VALUES
('test@test.com',
'$2a$10$7P3dxy.BxyOkjaYW9pNsb.cuZ0R9b0jtMNhye3KywDKKyp2nlxwoi',
'test', '1000000')`);
        });
    });

    describe('POST /login', () => {
        it('401 WRONG PASSWORD', (done) => {
            chai.request(server)
                .post("/login")
                .type('form')
                .send({
                    '_method': 'post',
                    'email': 'tester@test.com',
                    'password': '0'
                })
                .end((err, res) => {
                    // jwtoken = res.body.data.token;
                    res.should.have.status(401);
                    res.body.should.be.an("object");
                    // res.body.data.should.be.an("object");
                    // res.body.data.length.should.be.above(0);

                    done();
                });
        });
    });

    describe('POST /login', () => {
        it('200 CORRECT PASSWORD', (done) => {
            chai.request(server)
                .post("/login")
                .type('form')
                .send({
                    '_method': 'post',
                    'email': 'test@test.com',
                    'password': 'test'
                })
                .end((err, res) => {
                    jwtoken = res.body.data.token;
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    // res.body.data.should.be.an("object");
                    // res.body.data.length.should.be.above(0);

                    done();
                });
        });
    });
});

describe('Balance', () => {
    describe('PUT /balance/', () => {
        it('201 ADDED', (done) => {
            // console.log(jwtoken)
            chai.request(server)
                .put("/balance/")
                .type('form')
                .set('x-access-token', jwtoken)
                .send({
                    '_method': 'put',
                    'balance': '100000',
                    'id': '1'
                })
                .end((err, res) => {
                    res.should.have.status(201);
                    // res.body.should.be.an("object");
                    // res.body.data.should.be.an("array");
                    // res.body.data.length.should.be.above(0);

                    done();
                });
        });
    });
});


describe('Items 201 paths', () => {
    describe('GET /item/all', () => {
        it('201 HAPPY PATH', (done) => {
            chai.request(server)
                .get("/item/all")
                .set('x-access-token', jwtoken)
                .end((err, res) => {
                    res.should.have.status(201);

                    done();
                });
        });
    });

    describe('GET /item/details/1', () => {
        it('201 HAPPY PATH', (done) => {
            chai.request(server)
                .get("/item/details/1")
                .set('x-access-token', jwtoken)
                .end((err, res) => {
                    res.should.have.status(201);

                    done();
                });
        });
    });

    describe('POST /item/buy', () => {
        it('201 HAPPY PATH', (done) => {
            chai.request(server)
                .post("/item/buy")
                .type('form')
                .set('x-access-token', jwtoken)
                .send({
                    '_method': 'post',
                    'quantity': '1',
                    'price': '1000',
                    'item': '1',
                    'user': '1'
                })
                .end((err, res) => {
                    res.should.have.status(201);

                    done();
                });
        });
    });

    describe('POST /item/sell', () => {
        it('201 HAPPY PATH', (done) => {
            chai.request(server)
                .post("/item/sell")
                .type('form')
                .set('x-access-token', jwtoken)
                .send({
                    '_method': 'put',
                    'price': '1000',
                    'id': '1',
                    'user': '1'
                })
                .end((err, res) => {
                    res.should.have.status(201);

                    done();
                });
        });
    });
});



describe('Balance', () => {
    describe('PUT /balance/', () => {
        it('201 ADDED', (done) => {
            // console.log(jwtoken)
            chai.request(server)
                .put("/balance/")
                .type('form')
                .set('x-access-token', jwtoken)
                .send({
                    '_method': 'put',
                    'balance': '100000',
                    'id': '1'
                })
                .end((err, res) => {
                    res.should.have.status(201);
                    // res.body.should.be.an("object");
                    // res.body.data.should.be.an("array");
                    // res.body.data.length.should.be.above(0);

                    done();
                });
        });
    });
});


describe('Items 500 errors', () => {
    /*describe('GET /item/all', () => {
        it('201 HAPPY PATH', (done) => {
            chai.request(server)
                .get("/item/all")
                .set('x-access-token', jwtoken)
                .end((err, res) => {
                    res.should.have.status(201);

                    done();
                });
        });
    });*/

    describe('POST /item/buy', () => {
        it('Should return status code 500', (done) => {
            chai.request(server)
                .post("/item/buy")
                .type('form')
                .set('x-access-token', jwtoken)
                .send({
                    '_method': 'put',
                    'quantity': '1',
                    'price': '1000',
                    'item': '1',
                    'user': 'e'
                })
                .end((err, res) => {
                    res.should.have.status(500);

                    done();
                });
        });
    });

    describe('POST /item/buy', () => {
        it('Should return status code 500', (done) => {
            chai.request(server)
                .post("/item/buy")
                .type('form')
                .set('x-access-token', jwtoken)
                .send({
                    '_method': 'put',
                    'quantity': '1',
                    'price': '1000',
                    'item': 'e',
                    'user': '1'
                })
                .end((err, res) => {
                    res.should.have.status(500);

                    done();
                });
        });
    });

    describe('POST /item/buy', () => {
        it('Should return status code 500', (done) => {
            chai.request(server)
                .post("/item/buy")
                .type('form')
                .set('x-access-token', jwtoken)
                .send({
                    '_method': 'put',
                    'quantity': '100000000',
                    'price': '1000',
                    'item': '1',
                    'user': '1'
                })
                .end((err, res) => {
                    res.should.have.status(500);

                    done();
                });
        });
    });

    describe('POST /item/buy', () => {
        it('Should return status code 500', (done) => {
            chai.request(server)
                .post("/item/buy")
                .type('form')
                .set('x-access-token', jwtoken)
                .send({
                    '_method': 'put',
                    'quantity': '1',
                    'price': '100000000',
                    'item': '1',
                    'user': '1'
                })
                .end((err, res) => {
                    res.should.have.status(500);

                    done();
                });
        });
    });

    describe('POST /item/buy', () => {
        it('Should return status code 500', (done) => {
            chai.request(server)
                .post("/item/buy")
                .type('form')
                .set('x-access-token', jwtoken)
                .send({
                    '_method': 'put',
                    'quantity': '0',
                    'price': '100',
                    'item': '1',
                    'user': '1'
                })
                .end((err, res) => {
                    res.should.have.status(500);

                    done();
                });
        });
    });

    describe('POST /item/sell', () => {
        it('Should return status code 500', (done) => {
            chai.request(server)
                .post("/item/sell")
                .type('form')
                .set('x-access-token', jwtoken)
                .send({
                    '_method': 'put',
                    'price': '1000',
                    'id': 'e',
                    'user': 'e'
                })
                .end((err, res) => {
                    res.should.have.status(500);

                    done();
                });
        });
    });
});
