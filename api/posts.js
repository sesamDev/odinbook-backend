const express = require("express");
const router = express.Router();
const postsController = require("../controllers/postsController");
const passport = require("passport");

router.get("/comment/", passport.authenticate("jwt", { session: false }), postsController.get_all_comments);

router.get("/:id", passport.authenticate("jwt", { session: false }), postsController.get_all_posts);

router.get("/target/:postId", passport.authenticate("jwt", { session: false }), postsController.get_one_post);

router.post("/", passport.authenticate("jwt", { session: false }), postsController.post_new_post);

router.post("/comment/add", passport.authenticate("jwt", { session: false }), postsController.post_new_comment);

router.post("/like/add", passport.authenticate("jwt", { session: false }), postsController.post_add_like);

router.post("/like/remove", passport.authenticate("jwt", { session: false }), postsController.post_remove_like);

module.exports = router;
