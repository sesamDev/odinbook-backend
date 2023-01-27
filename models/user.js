const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  first_name: { type: String, min: 1, max: 100, required: true },
  last_name: { type: String, min: 1, max: 100, required: true },
  email: { type: String, min: 1, max: 100, required: true },
  password: { type: String, min: 1, max: 100, required: true },
  admin: { type: Boolean, default: false },
  avatar: { type: String },
});

UserSchema.virtual("url").get(function () {
  return `/user/${this._id}`;
});

UserSchema.virtual("full_name").get(function () {
  return `${this.first_name} ${this.last_name}`;
});

module.exports = mongoose.model("User", UserSchema);
