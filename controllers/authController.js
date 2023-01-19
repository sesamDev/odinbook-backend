const passport = require("passport");
const jwt = require("jsonwebtoken");

exports.login_with_email = function (req, res) {
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
      const token = jwt.sign({ user: userID }, process.env.JWT_SECRET);
      return res.json({ userID, token });
    });
  })(req, res);
};
