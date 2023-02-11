const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const requestController = require("../controllers/requestController");
const passport = require("passport");

// Get users friends
router.get("/friends", passport.authenticate("jwt", { session: false }), requestController.get_friends);

router.get("/", passport.authenticate("jwt", { session: false }), authController.get_current_user);

module.exports = router;
