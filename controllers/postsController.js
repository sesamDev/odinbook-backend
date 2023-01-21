exports.get_all_posts = (req, res) => {
  res.send("Send all posts");
};

exports.get_one_posts = (req, res) => {
  res.send("Send one post");
};

exports.get_all_comments_for_post = (req, res) => {
  res.send("Send all comments for post");
};
