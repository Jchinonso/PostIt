import expect from 'expect';
import chai from 'chai';
import supertest from 'supertest';
import app from '../../config/app';
import db from '../../models';
import groupHelper from '../Helpers/GroupHelper';


const request = supertest(app);
let groupResponse;


describe('Group API', () => {
  describe('create Group', () => {
    beforeEach((done) => {
      request.post('/api/group')
        .send(groupHelper.goodGroup1)
        .end((err, res) => {
          if (err) return err;
          groupResponse = res;
          done();
        });
    });

    afterEach(() => db.Groups.destroy({ where: {} }));

    it('should create a new group', (done) => {
      expect(groupResponse.status).toBe(200);
      expect(groupResponse.body.group).to.have.property(
        'name');
      expect(groupResponse.body.group).to.have.property(
        'description');
      expect(groupResponse.body.message).to.equal(
        'Group successfully created');
      done();
    });


    it('should not create the Group if it already exists', (done) => {
      request.post('/api/group')
        .send(groupHelper.goodGroup1)
        .end((err, response) => {
          if (err) return err;
          expect(response.status).to.equal(409);
          expect(response.body.message).to.equal(
            'Group already exist');
          done();
        });
    });
  });
});
