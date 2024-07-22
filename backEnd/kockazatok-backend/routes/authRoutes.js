const express = require("express");
const { register, bejelentkezes } = require("../controllers/authController");
const router = express.Router();

router.post("/register", register);
router.post("/bejelentkezes", bejelentkezes);

module.exports = router;
