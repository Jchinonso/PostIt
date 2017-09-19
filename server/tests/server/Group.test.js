import chai from 'chai';
import supertest from 'supertest';
import app from '../../config/app';
import db from '../../models';
import groupHelper from '../Helpers/GroupHelper';
import userHelper from '../Helpers/UserHelper';
import messageHelper from '../Helpers/MessageHelper';


const expect = chai.expect;
const request = supertest(app);
const goodMessage = messageHelper.goodMessage;
const badMessage = messageHelper.badMessage;
const goodGroup = groupHelper.goodGroup1;
const anotherGroup = groupHelper.goodGroup2;
const user = userHelper.anotherUser;
const userDoesntExist = userHelper.goodUser;
const badGroup = groupHelper.badGroup;
const username = userHelper.userName;
let groupId;
let userResponse;


describe('POST api/group', () => {
  beforeEach((done) => {
    request.post('/api/v1/user/signup')
    .send(user)
    .end((err, res) => {
      if (err) return err;
      userResponse = res.body;
      request.post('/api/v1/group')
      .set({ Authorization: userResponse.token })
      .set('Accept', 'application/json')
      .send(goodGroup)
      .end((err, res) => {
        if (err) return err;
        return done();
      });
    });
  });
  after(() => db.sequelize.sync({ force: true }));
  it('should create a new group', (done) => {
    request.post('/api/v1/group')
    .send(anotherGroup)
    .set({ Authorization: userResponse.token })
    .set('Accept', 'application/json')
    .end((err, res) => {
      if (err) return err;
      expect(res.status).to.equal(201);
      expect(res.body).to.have.property('name');
      expect(res.body).to.have.property('description');
      return done();
    });
  });
  it('should not create group with missing property ', (done) => {
    request.post('/api/v1/group')
    .send(badGroup)
    .set({ Authorization: userResponse.token })
    .end((err, res) => {
      expect(res.body.message).to.equal('unexpected error occured');
      return done();
    });
  });
  it('should not create a group if already exist ', (done) => {
    request.post('/api/v1/group')
    .send(goodGroup)
    .set({ Authorization: userResponse.token })
    .end((err, res) => {
      expect(res.status).to.equal(409);
      expect(res.body.message).to.equal('Group already exist');
      return done();
    });
  });
  it('should add users to group', (done) => {
    request.post('/api/v1/group/1/user')
    .send(username)
    .set({ Authorization: userResponse.token })
    .end((err, res) => {
      expect(res.status).to.equal(201);
      return done();
    });
  });
  it('should not add user to group if user has not signup', (done) => {
    request.post('/api/v1/group/1/user')
    .send(userDoesntExist)
    .set({ Authorization: userResponse.token })
    .set('Accept', 'application/json')
    .end((err, res) => {
      expect(res.status).to.equal(409);
      return done();
    });
  });
  it('should not add user to group if user already exist', (done) => {
    request.post('/api/v1/group/1/user')
    .send(username)
    .set({ Authorization: userResponse.token })
    .set('Accept', 'application/json')
    .end((err, res) => {
      expect(res.status).to.equal(400);
      return done();
    });
  });
  it('should get all users in a group', (done) => {
    request.get('/api/v1/group/1/user')
    .set({ Authorization: userResponse.token })
    .set('Accept', 'application/json')
    .end((err, res) => {
      expect(res.body.length).to.equal(1);
      return done();
    });
  });
  it('should not get user if group doesnt exist', (done) => {
    request.get('/api/v1/group/3/user')
    .set({ Authorization: userResponse.token })
    .set('Accept', 'application/json')
    .end((err, res) => {
      expect(res.status).to.equal(404);
      return done();
    });
  });
  it('should add message to group', (done) => {
    request.post('/api/v1/group/1/message')
    .send(goodMessage)
    .set({ Authorization: userResponse.token })
    .set('Accept', 'application/json')
    .end((err, res) => {
      expect(res.status).to.equal(201);
      done();
    });
  });
  it('should not add message to non existing group', (done) => {
    request.post('/api/v1/group/4/message')
    .send(goodMessage)
    .set({ Authorization: userResponse.token })
    .set('Accept', 'application/json')
    .end((err, res) => {
      expect(res.status).to.equal(409);
      done();
    });
  });
  it('should send error code for null content', (done) => {
    request.post('/api/v1/group/1/message')
    .send()
    .set({ Authorization: userResponse.token })
    .set('Accept', 'application/json')
    .end((err, res) => {
      expect(res.status).to.equal(400);
      done();
    });
  });
  it('should get messages that belongs to group', (done) => {
    request.get('/api/v1/group/1/message')
    .set({ Authorization: userResponse.token })
    .set('Accept', 'application/json')
    .end((err, res) => {
      expect(res.status).to.equal(200);
      done();
    });
  });
  it('should not get message if group doesnt exist', (done) => {
    request.get('/api/v1/group/3/message')
    .set({ Authorization: userResponse.token })
    .set('Accept', 'application/json')
    .end((err, res) => {
      expect(res.status).to.equal(404);
      done();
    });
  });


  // describe('POST api/group/:id/user', () => {
  //   beforeEach((done) => {
  //     request.post('/api/group')
  //       .send(goodGroup)
  //       .end((err, res) => {
  //         groupId = res.body.id;
  //         request.post('/api/user/signup')
  //         .send(user)
  //         .end((err, res) => {
  //           if (err) return err;
  //           userResponse = res;
  //           console.log(user);
  //           done();
  //         });
  //       });
  //   });
  // });
});

