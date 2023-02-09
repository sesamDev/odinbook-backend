const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FriendRequestSchema = new Schema({
  sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
  reciever: { type: Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("FriendRequest", FriendRequestSchema);
