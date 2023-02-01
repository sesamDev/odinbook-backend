const User = require("../models/user");
const Post = require("../models/post");

//TODO: Return formatted_timestamp
exports.get_all_posts = (req, res, next) => {
  User.find;

  Post.find({}, { password: 0 })
    .populate("author")
    .exec((err, posts) => {
      if (err) {
        return next(err);
      }
      return res.json(posts);
    });
};

exports.get_one_posts = (req, res) => {
  res.send("Send one post");
};

exports.get_all_comments_for_post = (req, res) => {
  res.send("Send all comments for post");
};

//TODO: Validate and sanitize input
//TODO: Save images
exports.post_new_post = (req, res) => {
  const post = new Post({
    text: req.body.text,
    author: req.body.author,
    timestamp: Date.now(),
  });

  post.save((err) => {
    if (err) {
      return console.log("Error: ", err);
    }
    console.log("Saved post to DB: ", post);
    return res.json({ sucess: true, post: post });
  });
};
