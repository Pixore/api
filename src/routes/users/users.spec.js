const { expect } = require('chai')
const request = require('supertest')

const app = require('../../index')
const { User } = require('../../models')

describe('Users', () => {
  let id
  before(() => User.remove({}))
  after(() => User.remove({}))
  it('GET / empty array', done => {
    request(app)
      .get('/api/users/')
      .set('Connection', 'keep-alive')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        expect(res.body).to.be.empty
        expect(err).to.be.null
        done()
      })
  })
  it('GET /:id Not Found', done => {
    request(app)
      .get('/api/users/57dc93358b334e5c0d331802')
      .set('Connection', 'keep-alive')
      .expect('Content-Type', /json/)
      .expect(404)
      .end(function (err, res) {
        expect(res.body).to.be.null
        expect(err).to.be.null
        done()
      })
  })
  it('GET /:id Found', done => {
    User.create({
      username: 'testName',
      email: 'email@test.com',
      displayName: 'Test Name',
      twitterID: 1234,
      profileImage: '/assets/images/profile.png'
    }).then(user => {
      id = user._id
      request(app)
        .get('/api/users/' + id)
        .set('Connection', 'keep-alive')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function (err, res) {
          console.log(err, res.body)
          expect(res.body).to.have.any.keys('username', 'displayName', '_id', 'profileImage')
          expect(err).to.be.null
          done()
        })
    })
  })
  it('GET /:id invalid id', done => {
    request(app)
      .get('/api/users/an-invalid-id')
      .set('Connection', 'keep-alive')
      .expect('Content-Type', /json/)
      .expect(500)
      .end(function (err, res) {
        expect(err).to.be.null
        expect(res.body).to.have.any.keys('message', 'path', 'type', 'context')
        done()
      })
  })
  it('PUT /:id ok', done => {
    request(app)
      .put('/api/users/' + id)
      .send({
        username: 'newusername',
        displayName: 'New Test Name',
        email: 'newemail@test.com'
      })
      .set('Connection', 'keep-alive')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        expect(res.body).to.have.any.keys('__v', 'username', 'displayName', 'email', '_id', 'profileImage')
        expect(res.body.username).to.equal('newusername')
        expect(res.body.displayName).to.equal('New Test Name')
        expect(res.body.email).to.equal('newemail@test.com')
        expect(err).to.be.null
        done()
      })
  })
  it('PUT /:id invalid property', done => {
    request(app)
      .put('/api/users/' + id)
      .send({
        username: 'test-name',
        displayName: 'Test Name',
        email: 'non-email'
      })
      .set('Connection', 'keep-alive')
      .expect('Content-Type', /json/)
      .expect(500)
      .end(function (err, res) {
        expect(res.body).to.have.any.keys('message', 'path', 'type', 'context')
        expect(err).to.be.null
        done()
      })
  })
})
