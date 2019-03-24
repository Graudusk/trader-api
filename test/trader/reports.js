"use strict";
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test';

/* global describe it */
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../app.js');

chai.should();
chai.use(chaiHttp);
/*
describe('Reports', () => {
    describe('GET /reports/kmom01', () => {
        it('200 HAPPY PATH', (done) => {
            chai.request(server)
                .get("/reports/kmom01")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    res.body.data.should.be.an("array");
                    res.body.data.length.should.be.above(0);

                    done();
                });
        });
    });

    describe('GET /reports/kmom02', () => {
        it('200 HAPPY PATH', (done) => {
            chai.request(server)
                .get("/reports/kmom02")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    res.body.data.should.be.an("array");
                    res.body.data.length.should.be.above(0);

                    done();
                });
        });
    });

    describe('GET 404', () => {
        it('404 SAD PATH', (done) => {
            chai.request(server)
                .get("/404")
                .end((err, res) => {
                    res.should.have.status(404);
                    // res.body.should.be.an("object");
                    // res.body.data.should.be.an("array");
                    // res.body.data.length.should.be.above(0);

                    done();
                });
        });
    });

    describe('GET /reports/error', () => {
        it('500 WRONG ARGUMENT', (done) => {
            chai.request(server)
                .get("/reports/kmom11")
                .end((err, res) => {
                    res.should.have.status(500);
                    // res.body.should.be.an("object");
                    // res.body.data.should.be.an("array");
                    // res.body.data.length.should.be.above(0);

                    done();
                });
        });
    });

    describe('GET /reports/error', () => {
        it('404 DATABASE ERROR', (done) => {
            chai.request(server)
                .get("/reports/")
                .end((err, res) => {
                    res.should.have.status(404);
                    // res.body.should.be.an("object");
                    // res.body.data.should.be.an("array");
                    // res.body.data.length.should.be.above(0);

                    done();
                });
        });
    });

    describe('POST /reports/', () => {
        it('403 NOT AUTHORIZED', (done) => {
            chai.request(server)
                .post("/reports/")
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
});


describe('Reports', () => {
    describe('POST /reports/', () => {
        it('403 NOT AUTHORIZED', (done) => {
            chai.request(server)
                .post("/reports/")
                .end((err, res) => {
                    res.should.have.status(403);
                    // res.body.should.be.an("object");
                    // res.body.data.should.be.an("array");
                    // res.body.data.length.should.be.above(0);

                    done();
                });
        });
    });

    describe('GET /reports/kmom01', () => {
        it('200 HAPPY PATH', (done) => {
            chai.request(server)
                .get("/reports/kmom01")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    res.body.data.should.be.an("array");
                    res.body.data.length.should.be.above(0);

                    done();
                });
        });
    });
});
*/
