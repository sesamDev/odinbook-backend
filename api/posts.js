const express = require("express");
const router = express.Router();
const postsController = require("../controllers/postsController");
const passport = require("passport");

router.get("/:id", passport.authenticate("jwt", { session: false }), postsController.get_all_posts);

router.post("/", passport.authenticate("jwt", { session: false }), postsController.post_new_post);

router.post("/like/add", passport.authenticate("jwt", { session: false }), postsController.post_add_like);

router.post("/like/remove", passport.authenticate("jwt", { session: false }), postsController.post_remove_like);

module.exports = router;
