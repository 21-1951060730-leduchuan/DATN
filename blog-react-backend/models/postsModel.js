var mongoose = require("mongoose");
var postSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: false,
  },
  tags: {
    type: String,
    required: false,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "authors",
  },
  date: {
    type: Date,
    required: false,
  },
  poster: {
    type: String,
    required: false,
  },
  countLike: {
    type: Number,
    default: 0,
  },
  comment: [
    {
      comment: { type: String, required: true },
      fullName: { type: String, required: true },
      email: { type: String, required: true },
      title: { type: String, required: true },
      status: { type: Number, required: true, default: 0 },
    },
  ],
});

module.exports = mongoose.model("post", postSchema);
