const FriendRequest = require("../models/friendRequest");
const User = require("../models/user");

exports.get_friend_requests = (req, res) => {
  FriendRequest.find({ reciever: req.params.id })
    .populate("sender", { first_name: 1, last_name: 1, avatar: 1 })
    .exec((err, requests) => {
      if (err) return res.send("Request error");
      return res.json(requests);
    });
};
exports.post_friend_request = (req, res) => {
  const request = new FriendRequest({
    sender: req.body.sender,
    reciever: req.body.reciever,
  });

  request.save((err) => {
    if (err) return console.log(err);
  });
  console.log("Request saved", req.body);
  res.sendStatus(200);
};

exports.post_accept_request = (req) => {
  User.findOneAndUpdate({ _id: req.user.id }, { $push: { friends: req.params.id } }, (err) => {
    if (err) return console.log("Failed to add user to friendlist");
    FriendRequest.findOneAndRemove({ sender: req.params.id, reciever: req.user.id }, (err) => {
      if (err) return "Failed to remove request";
      return console.log("Friend added");
    });
  });
};

exports.delete_decline_request = (req) => {
  FriendRequest.findByIdAndRemove(req.params.id, (err) => {
    if (err) return console.log("Error deleting request: ", err);
    return console.log("Deleted friend request: ", req.params.id);
  });
};

exports.get_friends = (req, res) => {
  User.findById(req.user._id, {})
    .populate("friends", { _id: 1, first_name: 1, last_name: 1, avatar: 1 })
    .exec((err, user) => {
      if (err) return console.log("Error getting user: ", err);
      res.json(user.friends);
    });
};
