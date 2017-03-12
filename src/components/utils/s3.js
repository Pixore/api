const AWS = require('aws-sdk')

const s3 = new AWS.S3()

exports.pngUpload = (stream, name) => {
  const uploadParams = {
    ContentType: 'image/png',
    Bucket: 'pixore-public',
    Body: stream,
    Key: name
  }
  return s3.upload(uploadParams)
    .promise()
}
