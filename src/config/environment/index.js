process.env.NODE_ENV = process.env.NODE_ENV || 'development'

const path = require('path')

const config = {}
config.MONGODB_URI = process.env.MONGODB_URI || 'mongodb://mongodb/pixore'
config.PORT = Number(process.env.PORT) || 80
config.isDev = process.env.NODE_ENV === 'development'
config.isTest = process.env.NODE_ENV === 'test'
config.ROOT_PATH = path.join(__dirname, '..', '..', '..', '..')
config.FILES_PATH = path.join(config.ROOT_PATH, config.isTest ? 'files-test' : 'files')
config.MODULES_PATH = path.join(config.ROOT_PATH, 'node_modules')
config.auth = {
  twitter: {
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    // callbackURL: `http://127.0.0.1:${config.PORT}/api/auth/twitter/callback`,
    includeEmail: true
  }
}
config.secret = process.env.PIXORE_SECRET || 'super duper secret for pixore'

module.exports = config
