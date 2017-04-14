exports.notFound = res => result => {
  if (!result) res.status(404)
  return result
}
exports.OK = res => result => {
  res.setHeader('Content-Type', 'application/json')
  res.json(result)
}

exports.serverError = res => err => {
  console.trace('error', err)
  res.setHeader('Content-Type', 'application/json')
  res.status(500).json(err)
}

exports.created = res => result => res.status(201).json(result)
