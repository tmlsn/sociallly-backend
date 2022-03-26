const mongoose = require("mongoose");
const { Schema, model } = mongoose;

// create a schema
const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
  },
  password: String,
});

// create a model
const User = model("User", userSchema);

// export the model to be user in other files
module.exports = User;
