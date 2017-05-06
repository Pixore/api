const mongoose = require('mongoose')
const Schema = mongoose.Schema

const spriteHistorySchema = new Schema({
  file: {type: String, required: true},
  preview: {type: String, required: true}
}, {timestamps: true})

module.exports = spriteHistorySchema
