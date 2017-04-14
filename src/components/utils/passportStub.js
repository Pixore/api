// BASE ON: https://github.com/gtramontina/passport-stub

const done = function (user, req, next) {
  return next(null, user)
}

const state = {}

const passportStub = (req, res, next) => {
  var passport
  if (!state.active) {
    return next()
  }
  passport = {
    deserializeUser: done,
    serializeUser: done,
    _userProperty: 'user',
    _key: 'passport'
  }
  req.__defineGetter__('_passport', function () {
    return {
      instance: passport,
      session: {
        user: state.user
      }
    }
  })
  req.__defineGetter__('user', function () {
    return state.user
  })
  req.__defineSetter__('user', function (val) {
    state.user = val
  })
  return next()
}

const use = app => {
  state.app = app
  return state.app.use(passportStub)
}

const login = user => {
  if (!state.app) {
    throw new Error('Passport Stub not installed.')
  }
  state.active = true
  state.user = user
}

const logout = () => {
  state.active = false
  state.user = undefined
}

module.exports = {
  login,
  logout,
  use
}
