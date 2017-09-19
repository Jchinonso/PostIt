import chai from 'chai';
import supertest from 'supertest';
import app from '../../config/app';
import db from '../../models';
import * as userHelper from '../Helpers/UserHelper';

const expect = chai.expect;
const request = supertest(app);

describe('POST api/user/signup', () => {
  beforeEach((done) => {
    request.post('/api/v1/user/signup')
    .send(userHelper.goodUser)
    .end((err, res) => {
      if (err) return err;
      done();
    });
  });
  after(() => db.sequelize.sync({ force: true }));
  it('should create a new user', (done) => {
    request.post('/api/v1/user/signup')
    .send(userHelper.anotherUser)
    .set('Accept', 'application/json')
    .end((err, res) => {
      if (err) return err;
      expect(res.status).to.equal(201);
      expect(res.body.username).to.equal('jdoe');
      expect(res.body.email).to.equal('jdoe@example.com');
      expect(res.body.phoneNumber).to.equal('09081890018');
      done();
    });
  });

  it('should return validation error if a field is missing', (done) => {
    request.post('/api/v1/user/signup')
    .send(userHelper.badUserOne)
    .set('Accept', 'application/json')
    .end((err, res) => {
      expect(res.body.msg).to.equal('Username, password, email and phoneNo required');
      return done();
    });
  });
  it('should not create a user if already exist ', (done) => {
    request.post('/api/v1/user/signup')
    .send(userHelper.goodUser)
    .set('Accept', 'application/json')
    .end((err, res) => {
      expect(res.status).to.equal(409);
      expect(res.body.msg).to.equal('user already exist');
      return done();
    });
  });
  it('should return validation error if username exist', (done) => {
    request.post('/api/v1/user/signup')
    .send(userHelper.anotherUserTwo)
    .set('Accept', 'application/json')
    .end((err, res) => {
      expect(res.body.msg).to.equal('username must be unique');
      return done();
    });
  });
  it('should signin a user', (done) => {
    request.post('/api/v1/user/signin')
    .send(userHelper.goodUser)
    .set('Accept', 'application/json')
    .end((err, res) => {
      expect(res.status).to.equal(200);
      expect(res.body.msg).to.equal('You have been loggedin successfully');
      return done();
    });
  });
  it('should not signin a user if user does not exist', (done) => {
    request.post('/api/v1/user/signin')
    .send(userHelper.userDoesntExist)
    .set('Accept', 'application/json')
    .end((err, res) => {
      expect(res.status).to.equal(401);
      expect(res.body.msg).to.equal('incorrect Email and password');
      return done();
    });
  });
  it('should get all existing users', (done) => {
    request.get('/api/v1/user')
    .end((err, res) => {
      expect(res.body.users.length).to.equal(2);
      return done();
    });
  });
  it('should validate email address', (done) => {
    request.post('/api/v1/user/signup')
    .send(userHelper.badUserTwo)
    .set('Accept', 'application/json')
    .end((err, res) => {
      if (err) return err;
      expect(res.body.msg).to.equal('incorrect Email');
      return done();
    });
  });
});

