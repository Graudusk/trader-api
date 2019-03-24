"use strict";
process.env.NODE_ENV = 'test';

/* global describe it */
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../app.js');
// const assert = require("assert");


chai.should();

chai.use(chaiHttp);

describe('Index', () => {
    describe('GET /', () => {
        it('200 HAPPY PATH', (done) => {
            chai.request(server)
                .get("/")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("object");

                    done();
                });
        });
    });
});
