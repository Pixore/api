const co = require('co')
const model = require('./sprites.mdl.js')
const modelUsers = require('../users/users.mdl.js')
const response = require('../../components/utils/response.js')
const { pngUpload, getPng } = require('../../components/utils/s3.js')

exports.isOwner = (req, res, next) => {
  model.getOne(req.params.id, req.user._id)
    .then(sprite => {
      if (sprite) {
        return next()
      }
      res.status(401)
    }).catch(response.serverError(res))
}

exports.post = (req, res) => co(function* () {
  let type = req.body.type
  let user
  if (!req.user) {
    let anonymous = yield modelUsers.findByUsernameOrCreate('anonymous', {
      username: 'anonymous',
      displayName: 'Anonymous',
      email: 'anonymous@pixore.com',
      twitterID: 0
    })
    user = anonymous._id
  } else {
    user = req.user._id
  }

  var {_id: id} = yield model.create({
    user,
    name: req.body.name,
    width: req.body.width,
    height: req.body.height,
    private: req.body.private,
    colors: req.body.colors,
    type: type,
    frames: req.body.frames,
    layers: req.body.layers
  })
  let file = req.files.shift()
  let namePreview = Date.now() + '.' + type
  const { Location } = yield pngUpload(file.buffer, namePreview)

  file = req.files.shift()
  let nameSpriteFile = Date.now() + '.png'
  const { Key } = yield pngUpload(file.buffer, nameSpriteFile, false)

  return yield model.update(id, {
    available: true,
    file: Key,
    preview: Location
  })
}).then(response.created(res))
  .catch(response.serverError(res))

exports.getHistory = (req, res) =>
  model.getHistory(req.params.id)
    .then(response.OK(res))
    .catch(response.serverError(res))

exports.getFile = function (req, res) {
  model.getOne(
    req.params.id,
    req.user._id
  )
  .then(sprite => {
    console.log(
      sprite,
      req.params.id,
      req.user._id
    )
    return sprite
  })
  .then(sprite => getPng(sprite.file))
  .then(file => {
    res.setHeader('Content-type', file.ContentType)
    res.send(file.Body)
  })
  .catch(response.serverError(res))
}

exports.getOne = (req, res) => {
  var promise
  console.log('get one', req.user, req.params.id)
  if (req.user) {
    promise = model
      .getOne(req.params.id, req.user._id)
      .then(sprite => sprite || model.getOnePublic(req.params.id))
  } else {
    promise = model.getOnePublic(req.params.id)
  }
  promise
    .then(response.notFound(res))
    .then(response.OK(res))
    .catch(response.serverError(res))
}

exports.getPublic = (req, res) =>
  model.getPublic()
    .then(response.OK(res))
    .catch(response.serverError(res))

exports.getAll = (req, res) =>
  model.getAll()
    .then(response.OK(res))
    .catch(response.serverError(res))

exports.getSearch = (req, res) =>
  model.getSearch(req.query)
    .then(response.OK(res))
    .catch(response.serverError(res))

exports.put = (req, res) => co(function *() {
  let id = req.params.id
  let type = req.body.type
  let namePreview = Date.now() + '.' + type
  let file = req.files.shift()
  let sprite = yield model.getOne(id, req.user._id)

  let previewTemp = sprite.preview
  let fileTemp = sprite.file
  const { Location } = yield pngUpload(file.buffer, namePreview)

  file = req.files.shift()
  let nameSpriteFile = Date.now() + '.png'
  const { Key } = yield pngUpload(file.buffer, nameSpriteFile, false)

  let history = yield model.createHistory({
    file: fileTemp,
    preview: previewTemp
  })
  sprite = yield model.update(sprite._id, {
    name: req.body.name || sprite.name,
    width: req.body.width || sprite.width,
    height: req.body.height || sprite.height,
    private: req.body.private || sprite.private,
    colors: req.body.colors || sprite.colors,
    type: type || sprite.type,
    frames: req.body.frames || sprite.frames,
    layers: req.body.layers || sprite.layers,
    file: Key,
    preview: Location,
    history: [history].concat(sprite.history)
  })

  return sprite
}).then(response.OK(res))
  .catch(response.serverError(res))

exports.putName = (req, res) =>
  model.updateName(req.params.id, req.body.name)
    .then(response.OK(res))
    .catch(response.serverError(res))
