//process.env.NODE_ENV = 'test';
let mongoose = require("mongoose");
let user = require('../models/loan');

let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('./../app');

let expect = chai.expect;
let should = chai.should();


chai.use(chaiHttp);
//Our parent block
describe('loan', () => {
   // beforeEach((done) => { 
    //    user.deleteMany({}, (err) => { 
       //    done();           
     //   });        
   // });

  describe('/GET loan', () => {
      it('it should GET all the loans', (done) => {
        chai.request(app)
            .get('/loan')
            .end((err, res) => {
                expect(res.body).to.be.a('array');
                expect(res).to.have.status(200);
                 
              done();
            });
      });
  });

  


});
