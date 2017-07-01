import chai from 'chai';
import supertest from 'supertest';
import app from '../../config/app';
import db from '../../models';
import userHelper from '../Helpers/UserHelper';

const expect = chai.expect;
const request = supertest(app);
const goodUser = userHelper.goodUser;
const badGroup = userHelper.badUser;
const userDoesntExist = userHelper.userDoesntExist;
let newUserResponse;

describe('POST api/user/signup', () => {
  beforeEach((done) => {
    request.post('/api/user/signup')
    .send(goodUser)
    .end((err, res) => {
      if (err) return err;
      newUserResponse = res;
      done();
    });
  });
  afterEach(() => db.Users.destroy({ where: {} }));
  it('should create a new user', (done) => {
    expect(newUserResponse.status).to.equal(201);
    expect(newUserResponse.body).to.have.property('username');
    expect(newUserResponse.body).to.have.property('email');
	  expect(newUserResponse.body).to.have.property('password');
    done();
  }); 
  it('should have a createdAt property', (done) => {
    expect(newUserResponse.body).to.have.property('createdAt');
    done();
  });
  it('should not create user with missing property ', (done) => {
    request.post('/api/user/signup')
    .send(badGroup)
    .end((err, res) => {
      expect(res.body.message).to.equal('property mising');
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
      expect(res.body.users.length).to.equal(1);
      return done();
    });
  });
});
