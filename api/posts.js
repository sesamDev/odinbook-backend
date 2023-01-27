const express = require("express");
const router = express.Router();
const postsController = require("../controllers/postsController");
const passport = require("passport");

router.get("/", passport.authenticate("jwt", { session: false }), postsController.get_all_posts);

router.post("/", passport.authenticate("jwt", { session: false }), postsController.post_new_post);

module.exports = router;
