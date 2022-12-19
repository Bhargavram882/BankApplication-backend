//process.env.NODE_ENV = 'test';
let mongoose = require("mongoose");
let user = require('../models/users');

let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('./../app');

let expect = chai.expect;
let should = chai.should();


chai.use(chaiHttp);
//Our parent block
describe('users', () => {
   // beforeEach((done) => { 
    //    user.deleteMany({}, (err) => { 
       //    done();           
     //   });        
   // });

  describe('/GET users', () => {
      it('it should GET all the users', (done) => {
        chai.request(app)
            .get('/users')
            .end((err, res) => {
                expect(res.body).to.be.a('array');
                expect(res).to.have.status(200);
                  //res.should.have.status(200);
                  //res.body.should.be.eql({});
                  //should(res.body).be.a({});
                  //res.body.length.should.be.eql(0);
              done();
            });
      });
  });

  


});
