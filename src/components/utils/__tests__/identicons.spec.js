
const nock = require('nock')
const { expect } = require('chai')
const ObjectID = require('mongoose').Types.ObjectId
const { generate } = require('../identicons')

nock(/amazonaws/)
  .put(/\/([\S\s]+.*)/)
  .times(2)
  .reply(200, '', ['x-amz-id-2',
    '87xNgA0AoA65Wyu0xehwEAodeZTN0XCGneZhVgphrxlS4DqXbjTimC3l9WUJrSWt5jv44FFFuQ4=',
    'x-amz-request-id',
    'CC561650A3FE851D',
    'Date',
    'Fri, 14 Apr 2017 17:32:40 GMT',
    'ETag',
    '"e90e12de82550661cdc042825e9470b2"',
    'Content-Length',
    '0',
    'Server',
    'AmazonS3'
  ])

describe('src/components/utils/identicons.js', () => {
  describe('When generate function get a hash', () => {
    it('should resolve an url', () => {
      return generate(ObjectID())
        .then(url => {
          expect(url).to.be.a('string')
          expect(url).to.contain('.png')
        })
    })
  })

  describe('When generate function get a hash and name', () => {
    it('should resolve an url with name', () => {
      return generate(ObjectID(), 'test-name')
        .then(url => {
          expect(url).to.contain('test-name.png')
        })
    })
  })

  describe('When generate function doesn\'t get a hash', () => {
    it('should reject an error', () => {
      return generate()
        .catch(err => {
          expect(err).to.be.a.instanceof(Error)
        })
    })
  })
})
