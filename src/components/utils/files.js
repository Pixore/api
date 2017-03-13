const fs = require('fs')
const Promise = require('bluebird')
const path = require('path')
const config = require('../../config/environment')
const response = require('./response.js')

function mkdir (folder, cb) {
  fs.mkdir(folder, onMkdir)
  function onMkdir (err) {
    if (err && err.code === 'ENOENT') {
      return mkdir(path.dirname(folder), onMkParent, true)
    }
    cb(err, folder)
  }
  function onMkParent () {
    fs.mkdir(folder, err => cb(err, folder))
  }
}

const write = (file, data) => new Promise((resolve, reject) => {
  file = path.join(config.FILES_PATH, file)
  write()

  function write (err) {
    if (err && err.code !== 'EEXIST') {
      return reject(err)
    }
    fs.writeFile(
      file,
      data,
      onWrite
    )
  }
  function onWrite (err) {
    if (err && err.code === 'ENOENT') {
      return mkdir(path.dirname(file), write)
    }
    if (err) reject(err)
    resolve(file)
  }
})

function move (oldPath, newPath, cb) {
  newPath = path.join(config.FILES_PATH, newPath)

  function move (result) {
    if (result && result.code !== 0 && result.description && result.description.code !== 'EEXIST') {
      return cb(result)
    }
    fs.rename(
      path.join(config.FILES_PATH, oldPath),
      newPath,
      onMove
    )
  }
  function onMove (err) {
    if (err && err.code === 'ENOENT') {
      return mkdir(path.dirname(newPath), move)
    }
    cb(response.commonResult(err, newPath))
  }
  move()
}

function remove (file, cb) {
  file = path.join(config.FILES_PATH, file)
  fs.unlink(
    file,
    err => cb(response.commonResult(err, file))
  )
}

exports.move = move
exports.write = write
exports.update = write
exports.join = path.join
exports.mkdir = mkdir
exports.remove = remove
exports.FILES_PATH = config.FILES_PATH
