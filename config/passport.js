const User = require("../models/user");
const bcrypt = require("bcryptjs");

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    function verify(email, password, done) {
      User.findOne({ email: email }, (err, user) => {
        if (err) return done(err, false, { message: err });
        if (!user) {
          return done(null, false, { message: "Incorrect username" });
        }
        bcrypt.compare(password, user.password, (err, res) => {
          if (res) {
            // passwords match! log user in
            return done(null, user, { message: "Login successful!" });
          } else {
            // passwords do not match!
            return done(null, false, { message: "Incorrect password" });
          }
        });
      });
    }
  )
);
