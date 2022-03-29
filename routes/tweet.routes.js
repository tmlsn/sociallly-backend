const express = require("express");
const Tweet = require("../models/tweet.model");

const router = express.Router();

// create tweet
router.post("/", async (req, res) => {
  const { content } = req.body;
  const tweet = await Tweet.create({ content, user: req.jwtPayload.user._id });
  res.status(200).json(tweet);
});

// get all tweets
router.get("/", async (req, res) => {
  const tweets = await Tweet.find().populate("user");
  res.status(200).json(tweets);
});

// get one tweet by id
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const tweet = await Tweet.findById(id);
  res.status(200).json(tweet);
});

// delete tweet by id
// TODO: you cannot delete a tweet if you are not the owner
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const tweet = await Tweet.findByIdAndDelete(id);
  res.status(200).json(tweet);
});

// edit tweet by id
// TODO: you cannot edit a tweet if you are not the owner
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    const tweet = await Tweet.findByIdAndUpdate(id, { content }, { new: true });
    res.status(200).json(tweet);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
