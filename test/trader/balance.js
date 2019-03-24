"use strict";
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test';

/* global describe it before */
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../app.js');
const misc = require('../helpfiles/misc.js');
// const db = require("../../db/database.js");

let jwtoken;

chai.should();
chai.use(chaiHttp);

describe('Balance', () => {
    describe('PUT /balance/', () => {
        it('403 NOT AUTHORIZED', (done) => {
            chai.request(server)
                .put("/balance/")
                .end((err, res) => {
                    res.should.have.status(403);
                    // res.body.should.be.an("object");
                    // res.body.data.should.be.an("array");
                    // res.body.data.length.should.be.above(0);

                    done();
                });
        });
    });
});


describe('Login', () => {
    before(() => {
        /*db.serialize(() => {
            db.run("DELETE FROM users", (err) => {
                if (err) {
                    console.error("Could not empty test DB users", err.message);
                }
            }).run(`
INSERT INTO users (email, password, name)
VALUES ('test@test.com','$2a$10$7P3dxy.BxyOkjaYW9pNsb.cuZ0R9b0jtMNhye3KywDKKyp2nlxwoi', 'test')`);
        });*/
        misc.prepare();
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
