const mongoose = require('mongoose')
const { Schema, model } = mongoose

const tweetSchema = new Schema({
    content: String,
    author: String,
    createdAt: new Date,
})

const Tweet = model('Tweet', tweetSchema)
