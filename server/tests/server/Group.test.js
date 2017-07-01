import chai from 'chai';
import supertest from 'supertest';
import app from '../../config/app';
import db from '../../models';
import groupHelper from '../Helpers/GroupHelper';

const expect = chai.expect;
const request = supertest(app);
const goodGroup = groupHelper.goodGroup;
const badGroup = groupHelper.badGroup;
let newGroupResponse;

describe('POST api/group', () => {
  beforeEach((done) => {
    request.post('/api/group')
    .send(goodGroup)
    .end((err, res) => {
      if (err) return err;
      newGroupResponse = res;
      done();
    });
  });
  afterEach(() => db.Groups.destroy({ where: {} }));
  it('should create a new group', (done) => {
    expect(newGroupResponse.status).to.equal(200);
    expect(newGroupResponse.body).to.have.property('name');
    expect(newGroupResponse.body).to.have.property('description');
    done();
  }); 
  it('should have a createdAt property', (done) => {
    expect(newGroupResponse.body).to.have.property('createdAt');
    done();
  });
  it('should not create group with missing property ', (done) => {
    request.post('/api/group')
    .send(badGroup)
    .end((err, res) => {
      expect(res.body.message).to.equal('property mising');
      return done();
    });
  });
  it('should not create a group if already exist ', (done) => {
    request.post('/api/group')
    .send(goodGroup)
    .end((err, res) => {
      expect(res.status).to.equal(409);
      expect(res.body.message).to.equal('Group already exist');
      return done();
    });
  });
});

