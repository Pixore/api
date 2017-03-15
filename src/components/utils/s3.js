const AWS = require('aws-sdk')

const s3 = new AWS.S3()

exports.pngUpload = (stream, name, isPublic = true) => {
  const params = {
    ContentType: 'image/png',
    Bucket: isPublic ? 'pixore-public' : 'pixore',
    Body: stream,
    Key: name
  }
  return s3.upload(params)
    .promise()
}

exports.getPng = Key => {
  const params = {
    Bucket: 'pixore',
    Key
  }
  return s3.getObject(params)
    .promise()
}
