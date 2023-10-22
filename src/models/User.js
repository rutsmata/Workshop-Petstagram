const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const {SALT} = require('../config/constants')

const userSchema = new mongoose.Schema({
  // according to the test requirements
  username: {
    type: String,
    required: true,
    unique: true,
    minLength: [2, "Username should be at least 2 characters"],
  },
  password: {
    type: String,
    required: true,
    minLength: [4, "Password should be at least 4 characters"]
  },
  email: {
    type: String,
    required: true,
    minLength: [10, "Email should be at least 10 characters"]
  },
});

// validate password
userSchema.virtual("repeatPassword").set(function (value) {
  if (this.password !== value) {
    throw new Error("Password missmatch!");
  }
});

//arrow function is not possible. Prior saving in the db we want to hash the password giving salt 10
userSchema.pre("save", async function () {
    const hash = await bcrypt.hash(this.password, SALT);

    this.password = hash;
});

const User = mongoose.model("User", userSchema);

module.exports = User;
