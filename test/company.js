/* eslint-disable no-undef */
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
// const auth = require('../middleware/auth.middleware');

// Assertion Style
chai.should();

chai.use(chaiHttp);

describe('Companies API', () => {
  // paste token of your registered user here
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjI2MTY1NDY4LCJleHAiOjE2MjY3NzAyNjh9.prPmm9MoYSyfEDQbpgBXTyK5iPt_z92SCMqhNs6wQd4';
  /**
   * Test the GET route
   */
  describe('GET /companies', () => {
    it('It should GET all the companies', (done) => {
      chai
        .request(server)
        .get('/companies')
        .set({ Authorization: `Bearer ${token}` })
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a('array');
          done();
        });
    });
  });
  /**
   * Test the GET (by id) route
   */
  describe('GET /companies/:id', () => {
    it('It should GET the company by ID', (done) => {
      const id = 1;
      chai
        .request(server)
        .get(`/companies/${id}`)
        .set({ Authorization: `Bearer ${token}` })
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a('object');
          response.body.should.have.property('name');
          response.body.should.have.property('shortName');
          response.body.should.have.property('id').eq(1);
          done();
        });
    });
  });
  /**
   * Test the POST route
   */
  describe('POST /companies', () => {
    it('It should POST a new company', (done) => {
      const company = {
        name: 'ООО «Веселый Роджер»',
        shortName: 'Веселый Роджер',
        businessEntity: 'ООО',
        address: 'Пиратская ул. 13',
        contract_no: 131309,
        contract_issue_date: '2019-06-12T00:00:00.000Z',
        type: ['agent'],
        status: 'active',
        contactId: 1,
      };
      chai
        .request(server)
        .post('/companies')
        .set({ Authorization: `Bearer ${token}` })
        .send(company)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a('object');
          response.body.should.have.property('id');
          response.body.should.have.property('name').eq('ООО «Веселый Роджер»');
          response.body.should.have.property('shortName').eq('Веселый Роджер');
          done();
        });
    });

    it('It should NOT POST a new company without the name property', (done) => {
      const company = {
        shortName: 'Веселый Роджер',
        businessEntity: 'ООО',
        address: 'Пиратская ул. 13',
        contract_no: 131309,
        contract_issue_date: '2019-06-12T00:00:00.000Z',
        type: ['agent'],
        status: 'active',
        contactId: 1,
      };
      chai
        .request(server)
        .post('/companies')
        .set({ Authorization: `Bearer ${token}` })
        .send(company)
        .end((err, response) => {
          response.should.have.status(400);
          response.text.should.be.eq('{"message":"Content can not be empty!"}');
          done();
        });
    });
  });
  /**
   * Test the PATCH route
   */
  describe('PATCH /companies/:id', () => {
    it('It should PATCH existing company by ID', (done) => {
      const id = 1;
      const company = {
        status: 'passive',
      };
      chai
        .request(server)
        .patch(`/companies/${id}`)
        .set({ Authorization: `Bearer ${token}` })
        .send(company)
        .end((err, response) => {
          response.should.have.status(200);
          response.text.should.be.eq(
            '{"message":"Company data was updated successfully."}',
          );
          done();
        });
    });
  });
  /**
   * Test the DELETE route
   */
  describe('DELETE /companies/:id', () => {
    it('It should DELETE existing company by ID', (done) => {
      const id = 2;
      chai
        .request(server)
        .delete(`/companies/${id}`)
        .set({ Authorization: `Bearer ${token}` })
        .end((err, response) => {
          response.should.have.status(200);
          response.text.should.be.eq(
            '{"message":"The company was deleted successfully"}',
          );
          done();
        });
    });
  });
});
