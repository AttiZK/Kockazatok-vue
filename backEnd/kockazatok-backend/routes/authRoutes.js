//routes/authRoutes.js

const express = require("express");
const router = express.Router();
const { register, bejelentkezes } = require("../controllers/authController");

router.post("/register", register);
router.post("/bejelentkezes", bejelentkezes);

module.exports = router;
