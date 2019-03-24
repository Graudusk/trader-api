"use strict";
process.env.NODE_ENV = 'test';

/* global describe it before */
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../app.js');
// const assert = require("assert");

const db = require("../../db/database.js");

let jwtoken = '';

chai.should();

chai.use(chaiHttp);

describe('Login', () => {
    before(() => {
        db.run("DELETE FROM users", (err) => {
            if (err) {
                console.error("Could not empty test DB users", err.message);
            }
        });
        db.run("DELETE FROM reports WHERE title = 'title'", (err) => {
            if (err) {
                console.error("Could not empty reports", err.message);
            }
        });
    });

    describe('POST /register', () => {
        it('201 USER REGISTERED', (done) => {
            chai.request(server)
                .post("/register")
                .type('form')
                .send({
                    '_method': 'post',
                    'email': 'tester@test.com',
                    'password': 'test'
                })
                .end((err, res) => {
                    // console.log(res);
                    res.should.have.status(201);
                    // res.body.should.be.an("object");
                    // res.body.data.should.be.an("array");
                    // res.body.data.length.should.be.above(0);

                    done();
                });
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
                    res.should.have.status(401);
                    res.body.should.be.an("object");
                    // res.body.data.should.be.an("object");
                    // res.body.data.length.should.be.above(0);

                    done();
                });
        });
    });
    describe('POST /login', () => {
        it('401 NULL USERNAME', (done) => {
            chai.request(server)
                .post("/login")
                .type('form')
                .send({
                    'email': null,
                    '_method': 'post',
                    'password': '0'
                })
                .end((err, res) => {
                    res.should.have.status(401);
                    res.body.should.be.an("object");
                    // res.body.data.should.be.an("object");
                    // res.body.data.length.should.be.above(0);

                    done();
                });
        });
    });


    describe('POST /login', () => {
        it('401 WRONG USERNAME', (done) => {
            chai.request(server)
                .post("/login")
                .type('form')
                .send({
                    '_method': 'post',
                    'email': '0',
                    'password': '0'
                })
                .end((err, res) => {
                    res.should.have.status(401);
                    res.body.should.be.an("object");
                    // res.body.data.should.be.an("object");
                    // res.body.data.length.should.be.above(0);

                    done();
                });
        });
    });

    describe('POST /login', () => {
        it('200 HAPPY LOGIN', (done) => {
            chai.request(server)
                .post("/login")
                .type('form')
                .send({
                    '_method': 'post',
                    'email': 'tester@test.com',
                    'password': 'test'
                })
                .end((err, res) => {
                    jwtoken = res.body.data.token;
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    res.body.data.should.be.an("object");
                    // res.body.data.length.should.be.above(0);

                    done();
                });
        });
    });
});
