const User = require("../models/user");
const Post = require("../models/post");

//TODO: Return formatted_timestamp
exports.get_all_posts = (req, res) => {
  User.findById(req.params.id, (err, user) => {
    if (err) return console.log(err);

    let friendList = user.friends;
    friendList.push(user._id);

    Post.find({ author: { $in: friendList } }, { text: 1, author: 1, timestamp: 1 })
      .limit(300)
      .sort({ timestamp: -1 })
      .populate("author", "first_name last_name")
      .exec((err, posts) => {
        if (err) return res.json(err);
        return res.json(posts);
      });
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
