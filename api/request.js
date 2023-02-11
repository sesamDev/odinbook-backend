const express = require("express");
const router = express.Router();
const requestController = require("../controllers/requestController");
const passport = require("passport");

// Get all friend requests for user with :id
router.get("/get/:id", passport.authenticate("jwt", { session: false }), requestController.get_friend_requests);

// Accept friend request
router.post("/accept/:id", passport.authenticate("jwt", { session: false }), requestController.post_accept_request);

// Decline friend request
router.delete(
  "/decline/:id",
  passport.authenticate("jwt", { session: false }),
  requestController.delete_decline_request
);

// Send friend request
router.post("/", passport.authenticate("jwt", { session: false }), requestController.post_friend_request);

module.exports = router;
