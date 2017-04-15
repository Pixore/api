const passportStub = require('../../components/utils/passportStub.js')

const { expect } = require('chai')
const request = require('supertest')
const app = require('../../index')
const { User } = require('../../models')

const req = request(app)

let user

describe('auth', () => {
  before(() => User.remove({})
    .then(() => User.create({
      username: 'testuser',
      displayName: 'Test user'
    })).then(_user => {
      user = _user
    }))

  after(() => User.remove({}))
  it('GET /whoami Somebody', done => {
    passportStub.login(user)
    req
      .get('/api/auth/whoami')
      .set('Connection', 'keep-alive')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        expect(res.body).to.have.any.keys('username', '_id', 'displayName', 'profileImage')
        expect(err).to.be.null
        done()
      })
  })
  it('GET /whoami Nobody', done => {
    passportStub.logout()
    req
      .get('/api/auth/whoami')
      .set('Connection', 'keep-alive')
      .expect('Content-Type', /json/)
      .expect(401)
      .end(function (err, res) {
        expect(res.body).to.equal('')
        expect(err).to.be.null
        done()
      })
  })
})
