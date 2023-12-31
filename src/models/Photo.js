const mongoose = require("mongoose");

const photoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"], // put some error message
    minLength: [2, "Name should be at least 2 characters"],

  },
  image: {
    type: String,
    required: [true, "Image is required"],
    match: [/^https?:\/\//, 'Invalid URL'], // /^https?:\/\/.+/
  },
  age: {
    type: Number,
    required: [true, "Age is required"],
    min: [1, "Age should be between 1 and 100"],
    max: [100, "Age should be between 1 and 100"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
    minLength: [5, 'Text should be between 5 and 50 characters'],
    maxLength: [50, 'Text should be between 5 and 50 characters'],
  },
  location: {
    type: String,
    required: [true, "Location is required"],
    minLength: [5, 'Text should be between 5 and 50 characters'],
    maxLength: [50, 'Text should be between 5 and 50 characters'],
  },
  owner: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  comments: [
    {
      userId: mongoose.Types.ObjectId,
      username: String,
      message: {
        type: String,
        required: [true, "Comment message is required"],
      },
    },
  ],
});

const Photo = mongoose.model("Photo", photoSchema);

module.exports = Photo;
