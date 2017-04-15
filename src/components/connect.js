const mongodb = require('mongodb')
const mongoose = require('mongoose')
const ObjectID = mongodb.ObjectID
const config = require('../config/environment')
const MongoClient = mongodb.MongoClient

var url = config.MONGODB_URI
mongoose.connect(url)
exports.dbPromise = MongoClient.connect(url)

exports.ObjectID = ObjectID

exports.validId = ObjectID.isValid
