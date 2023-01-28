const User = require("../models/user");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

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

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      // eslint-disable-next-line no-undef
      secretOrKey: process.env.JWT_SECRET,
    },
    function (jwtPayload, done) {
      console.log("---JWT AUTH---");
      console.log(jwtPayload);
      User.findById(jwtPayload.user, { password: 0 })
        .populate("friends", { password: 0 })
        .exec((err, user) => {
          console.log(user);

          if (err) return done(err, false);
          return done(null, user);
        });
    }
  )
);
