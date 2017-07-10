import chai from 'chai';
import supertest from 'supertest';
import app from '../../config/app';
import db from '../../models';
import userHelper from '../Helpers/UserHelper';

const expect = chai.expect;
const request = supertest(app);
const goodUser = userHelper.goodUser;
const badUser1 = userHelper.badUser1;
const badUser2 = userHelper.badUser2;
const anotherUser = userHelper.anotherUser;
const userDoesntExist = userHelper.userDoesntExist;
const anotherUser2 = userHelper.anotherUser2;

describe('POST api/user/signup', () => {
  beforeEach((done) => {
    request.post('/api/user/signup')
    .send(goodUser)
    .end((err, res) => {
      if (err) return err;
      done();
    });
  });
  after(() => db.sequelize.sync({ force: true }));
  it('should create a new user', (done) => {
    request.post('/api/user/signup')
    .send(anotherUser)
    .end((err, res) => {
      if (err) return err;
      expect(res.status).to.equal(201);
      expect(res.body).to.have.property('username');
      expect(res.body).to.have.property('email');
      expect(res.body).to.have.property('password');
      expect(res.body).to.have.property('createdAt');
      done();
    });
  }); 
  
  it('should not create user with missing property ', (done) => {
    request.post('/api/user/signup')
    .send(badUser1)
    .end((err, res) => {
      expect(res.body.message).to.equal('Unexpected error occured');
      return done();
    });
  });
  it('should not create a user if already exist ', (done) => {
    request.post('/api/user/signup')
    .send(goodUser)
    .end((err, res) => {
      expect(res.status).to.equal(409);
      expect(res.body.message).to.equal('user already exist');
      return done();
    });
  });
  it('should signin a user', (done) => {
    request.post('/api/user/signin')
    .send(goodUser)
    .end((err, res) => {
      expect(res.status).to.equal(200);
      expect(res.body.message).to.equal('You have been loggedin successfully');
      return done();
    });
  });
  it('should not signin a user if user does not exist', (done) => {
    request.post('/api/user/signin')
    .send(userDoesntExist)
    .end((err, res) => {
      expect(res.status).to.equal(409);
      expect(res.body.message).to.equal('incorrect Email and password');
      return done();
    });
  });
  it('should get all existing users', (done) => {
    request.get('/api/user')
    .end((err, res) => {
      expect(res.body.users.length).to.equal(2);
      return done();
    });
  });
  it('should validate email address', (done) => {
    request.post('/api/user/signup')
    .send(badUser2)
    .end((err, res) => {
      if (err) return err;
      expect(res.body.message).to.equal('Unexpected error occured');
      return done();
    });
  });
  it('should unique username', (done) => {
    request.post('/api/user/signup')
    .send(anotherUser2)
    .end((err, res) => {
      if (err) return err;
      expect(res.body.message).to.equal('Unexpected error occured');
      return done();
    });
  });
});

