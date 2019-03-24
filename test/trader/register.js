"use strict";
process.env.NODE_ENV = 'test';

/* global describe it before */
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../app.js');
// const assert = require("assert");

const db = require("../../db/database.js");


chai.should();

chai.use(chaiHttp);

describe('Register', () => {
    before(() => {
        db.run("DELETE FROM users", (err) => {
            if (err) {
                console.error("Could not empty test DB users", err.message);
            }
        });
    });

    describe('POST /register', () => {
        it('500 NULL VALUE EXCEPTION', (done) => {
            chai.request(server)
                .post("/register")
                .type('form')
                .send({
                    '_method': 'post',
                    'password': ''
                })
                .end((err, res) => {
                    // console.log(res);
                    res.should.have.status(500);
                    // res.body.should.be.an("object");
                    // res.body.data.should.be.an("array");
                    // res.body.data.length.should.be.above(0);

                    done();
                });
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


    describe('POST /register', () => {
        it('500 DUPLICATE USER', (done) => {
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
                    res.should.have.status(500);
                    // res.body.should.be.an("object");
                    // res.body.data.should.be.an("array");
                    // res.body.data.length.should.be.above(0);

                    done();
                });
        });
    });
});
