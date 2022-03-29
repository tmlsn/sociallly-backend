const mongoose = require('mongoose')
const {Schema, model} = mongoose

const tweetSchema = new Schema({
  content: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
    ref: "User"
  }
})

const Tweet = model('Tweet', tweetSchema)

module.exports = Tweet