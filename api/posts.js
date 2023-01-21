const express = require("express");
const router = express.Router();
const postsController = require("../controllers/postsController");

router.get("/", postsController.get_all_posts);
router.get("/api/v1/login", (req, res) => {
  console.log(req.query.email);
  res.sendStatus(200);
});

module.exports = router;
