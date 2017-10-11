import chai from 'chai';
import supertest from 'supertest';
import app from '../../config/app';
import db from '../../models';
import groupHelper from '../Helpers/GroupHelper';
import userHelper from '../Helpers/UserHelper';
import messageHelper from '../Helpers/MessageHelper';


const expect = chai.expect;
const should = chai.should()
const request = supertest(app);
const goodMessage = messageHelper.goodMessage;
const badMessage = messageHelper.badMessage;
const goodGroup = groupHelper.goodGroup1;
const anotherGroup = groupHelper.goodGroup2;
const user = userHelper.anotherUser;
const userDoesntExist = userHelper.goodUser;
const badGroup = groupHelper.badGroup;

let groupId;
let userResponse;
let token;



describe('POST api/group', () => {
  before((done) => {
    request.post('/api/v1/user/signup')
    .send(user)
    .end((err, res) => {
      console.log(res.body);
      token = res.body.token;
      done()
    })
  })
  it('should create a new group', (done) => {
    request.post('/api/v1/group')
    .send(anotherGroup)
    .set('x-access-token', token)
    .set('Accept', 'application/json')
    .end((err, res) => {
      expect(res.body).to.be.an('object')
      expect(res.status).to.equal(201);
      expect(res.body.name).to.equal(anotherGroup.name);
      expect(res.body.description).to.equal(anotherGroup.description);
      done();
    });
  });
  it('should not create group with missing property ', (done) => {
    request.post('/api/v1/group')
    .send(badGroup)
    .set('x-access-token', token)
    .end((err, res) => {
      expect(res.body.msg).to.equal('Name, Description required');
      done();
    });
  });
  it('should not create a group if already exist ', (done) => {
    request.post('/api/v1/group')
    .send(anotherGroup)
    .set( 'x-access-token', token )
    .end((err, res) => {
      expect(res.status).to.equal(409);
      expect(res.body.msg).to.equal('Group already exist');
      done();
    });
  });
  it('should add users to group', (done) => {
    request.post('/api/v1/group/1/user')
    .set('x-access-token', token)
    .set('Accept', 'application/json')
    .send({members: 'johnDoe'})
    .end((err, res) => {
      expect(res.body.msg).to.equal('User added successfully to group')
      done();
    });
  })
  it('should not add user to group if user has not signup', (done) => {
    request.post('/api/v1/group/1/user')
    .send()
    .set('x-access-token', token)
    .set('Accept', 'application/json')
    .end((err, res) => {
      expect(res.status).to.equal(404);
      expect(res.body.msg).to.equal('User does not exist')
      done();
    });
  });
  it('should not add user to group if user already exist', (done) => {
    request.post('/api/v1/group/1/user')
    .send({members: 'johnDoe'})
    .set('x-access-token', token)
    .set('Accept', 'application/json')
    .end((err, res) => {
      expect(res.status).to.equal(409);
      expect(res.body.msg).to.equal('User already a member of this group')
      done();
    });
  });
  it('should get all users in a group', (done) => {
    request.get('/api/v1/group/1/user')
    .set('x-access-token', token)
    .set('Accept', 'application/json')
    .end((err, res) => {
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('groupMembers')
     done();
    });
  });
  it('should not get user if group doesnt exist', (done) => {
    request.get('/api/v1/group/4/user')
    .set('x-access-token', token)
    .set('Accept', 'application/json')
    .end((err, res) => {
      expect(res.status).to.equal(404);
      expect(res.body.msg).to.equal('Group does not exist')
      done();
    });
  });
  it('should add message to group', (done) => {
    request.post('/api/v1/group/1/message')
    .send(goodMessage)
    .set('x-access-token', token)
    .set('Accept', 'application/json')
    .end((err, res) => {
      expect(res.status).to.equal(201);
      done();
    });
  });
  it('should not add message to non existing group', (done) => {
    request.post('/api/v1/group/4/message')
    .send(goodMessage)
    .set('x-access-token', token)
    .set('Accept', 'application/json')
    .end((err, res) => {
      expect(res.status).to.equal(409);
      done();
    });
  });
  it('should send error code for null content', (done) => {
    request.post('/api/v1/group/1/message')
    .send()
    .set('x-access-token', token)
    .set('Accept', 'application/json')
    .end((err, res) => {
      expect(res.status).to.equal(400);
      done();
    });
  });
  it('should get messages that belongs to group', (done) => {
    request.get('/api/v1/group/1/message')
    .set('x-access-token', token)
    .set('Accept', 'application/json')
    .end((err, res) => {
      expect(res.status).to.equal(200);
      done();
    });
  });
  it('should not get message if group doesnt exist', (done) => {
    request.get('/api/v1/group/4/message')
    .set('x-access-token', token)
    .set('Accept', 'application/json')
    .end((err, res) => {
      expect(res.status).to.equal(404);
      done();
    });
  });

});
