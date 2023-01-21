const passport = require("passport");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const bcrypt = require("bcryptjs");

exports.login_with_email = function (req, res) {
  //TODO: Validate and sanitize input
  passport.authenticate("local", { session: false }, (err, user, info) => {
    console.log("Authanticate user: ", user._id);
    console.log("Authanticate error: ", err);
    console.log("Authanticate info: ", info);

    if (err || !user) {
      return res.status(400).json({
        message: info.message,
        user: user,
      });
    }

    req.login(user, { session: false }, (err) => {
      if (err) {
        res.send(err);
      }
      const userID = user._id;
      // generate a signed son web token with the contents of user object and return it in the response
      // eslint-disable-next-line no-undef
      const token = jwt.sign({ user: userID }, process.env.JWT_SECRET, { expiresIn: "30d" });
      return res.json({ success: true, userID, token });
    });
  })(req, res);
};

exports.register_with_email = function (req, res, next) {
  //TODO: Validate and sanitize input
  if (req.body.password !== req.body.confirmPassword)
    return res.json({ success: false, message: "Passwords do not match" });

  // eslint-disable-next-line no-undef
  bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
    if (err) {
      return next(err);
    }
    const user = new User({
      first_name: req.body.firstName,
      last_name: req.body.lastName,
      email: req.body.email,
      password: hashedPassword,
    });

    user.save((err) => {
      if (err) return console.log("Failed to save user to DB");
      res.status(200).json({ success: true, message: "User added" });
      return console.log(user + " : Saved to DB!");
    });
  });
};

exports.get_current_user = function (req, res) {
  res.json(req.user);
};
