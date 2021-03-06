const config = require('./environment')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)

const { dbPromise } = require('../components/connect.js')

module.exports = function (app) {
  app.use(morgan('dev'))
  app.use(cookieParser(config.secret))
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(session({
    secret: config.secret,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({dbPromise})
  }))

  require('./passport.js')(app)
}
