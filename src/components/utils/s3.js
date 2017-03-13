const AWS = require('aws-sdk')

const s3 = new AWS.S3()

exports.pngUpload = (stream, name, isPublic = true) => {
  const uploadParams = {
    ContentType: 'image/png',
    Bucket: isPublic ? 'pixore-public' : 'pixore',
    Body: stream,
    Key: name
  }
  return s3.upload(uploadParams)
    .promise()
    .then(result => result.Location)
}
