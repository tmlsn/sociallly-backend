const mongoose = require('mongoose')
const {Schema, model} = mongoose

const tweetSchema = new Schema({
  content: {
    type: String,
    required: true
  }
})

const Tweet = model('Tweet', tweetSchema)

module.exports = Tweet