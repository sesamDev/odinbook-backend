const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  text: { type: String, min: 1, max: 100, required: true },
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  related_post: { type: Schema.Types.ObjectId, ref: "Post", required: true },
  timestamp: { type: Date, default: Date.now() },
  likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

module.exports = mongoose.model("Comment", CommentSchema);
