const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/login", authController.login_with_email);
router.post("/register", authController.register_with_email);

module.exports = router;
