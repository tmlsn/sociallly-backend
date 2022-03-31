const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const router = express.Router();

// create a user
router.post("/signup", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({
    firstName,
    lastName,
    email,
    password: passwordHash,
  });
  res.send(user);
});

// user login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  // find a user a given email
  const user = await User.findOne({ email });
  // if user exists
  if (user) {
    // check if the password is correct
    const passwordCorrect = await bcrypt.compare(password, user.password);
    // if password is correct
    if (passwordCorrect) {
      // create a payload
      const payload = {
        user,
      };
      // create a token
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        algorithm: "HS256",
        expiresIn: "6h",
      });
      // send the token to the user
      res.status(200).send(token);
    } else {
      res.status(401).send("email or password are incorrect");
    }
  } else {
    res.status(401).send("email or password are incorrect");
  }
});

module.exports = router;
