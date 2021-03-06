const moment = require('moment')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

function getFormatNow () {
  return moment().format('LLL')
}

const editorSchema = new Schema({
  name: {
    type: String,
    default: getFormatNow
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  palette: {
    type: Schema.Types.ObjectId,
    ref: 'Palette'
  },
  layout: Schema.Types.Mixed,
  sprites: [{type: Schema.Types.ObjectId, ref: 'Sprite'}]
}, {timestamps: true})

module.exports = editorSchema
