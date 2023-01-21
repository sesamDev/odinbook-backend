const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const passport = require("passport");

router.get("/", passport.authenticate("jwt", { session: false }), authController.get_current_user);

module.exports = router;
