const Post = require("../models/post");

//TODO: Return formatted_timestamp
exports.get_all_posts = (req, res, next) => {
  Post.find({ author: req.query.userID })
    .populate("author")
    .exec((err, posts) => {
      if (err) {
        return next(err);
      }
      console.log(posts);
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
  console.log("Calling create post from userID: ", req.query.userID);
  const post = new Post({
    title: "Test Post",
    text: "Test text",
    author: req.query.userID,
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
