const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { DateTime } = require("luxon");

const PostSchema = new Schema({
  text: { type: String, min: 1, max: 100, required: true },
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  timestamp: { type: Date, default: Date.now() },
  likes: { type: Number, default: 0 },
});

PostSchema.virtual("timestamp_formatted").get(function () {
  return DateTime.fromJSDate(this.timestamp).toLocaleString(DateTime.DATE_MED);
});

PostSchema.virtual("url").get(function () {
  return `/api/post/${this._id}`;
});

module.exports = mongoose.model("Post", PostSchema);
