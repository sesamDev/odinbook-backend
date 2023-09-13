const User = require("../models/user");
const Post = require("../models/post");
const Comment = require("../models/comment");

//TODO: Return formatted_timestamp
exports.get_all_posts = (req, res) => {
  User.findById(req.params.id, (err, user) => {
    if (err) return console.log(err);

    let friendList = user.friends;
    friendList.push(user._id);

    Post.find({ author: { $in: friendList } }, { text: 1, author: 1, imgURL: 1, timestamp: 1, likes: 1 })
      .limit(300)
      .sort({ timestamp: -1 })
      .populate("author", "first_name last_name")
      .exec((err, posts) => {
        if (err) return res.json(err);
        return res.json(posts);
      });
  });
};

exports.get_one_post = (req, res) => {
  Post.findById(req.params.postId)
    .populate("author", { password: 0, admin: 0, friends: 0, posts: 0, email: 0 })
    .exec((err, post) => {
      if (err) console.log(err);
      res.json(post);
    });
};

exports.get_all_comments_for_post = (req, res) => {
  res.send("Send all comments for post");
};

//TODO: Validate and sanitize input
exports.post_new_post = (req, res) => {
  console.log("Image??: " + req.body.imgURL);

  const post = new Post({
    text: req.body.text,
    author: req.body.author,
    imgURL: req.body.imgURL,
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

exports.post_add_like = (req) => {
  Post.findByIdAndUpdate(req.query.postId, { $push: { likes: req.query.userId } }, {}, (err) => {
    if (err) return console.log("error: ", err);
    console.log("Like added to post: ", req.query.postId);
  });
};

exports.post_remove_like = (req) => {
  Post.findByIdAndUpdate(req.query.postId, { $pull: { likes: req.query.userId } }, {}, (err) => {
    if (err) return console.log("error: ", err);
    console.log("Like removed from post: ", req.query.postId);
  });
};

exports.post_new_comment = (req, res) => {
  const comment = new Comment({
    related_post: req.query.postID,
    author: req.query.userID,
    text: req.query.text,
  });

  comment.save((err) => {
    if (err) return console.log("Error saving comment: ", err);
    res.sendStatus(200);
  });
};

exports.get_all_comments = (req, res) => {
  Comment.find({ related_post: req.query.postID })
    .populate("author", { password: 0, friends: 0, posts: 0, email: 0, admin: 0 })
    .sort({ timestamp: -1 })
    .exec((err, comments) => {
      if (err) return console.log(err);
      res.json(comments);
    });
};
