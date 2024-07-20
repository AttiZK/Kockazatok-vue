const express = require('express');
const router = express.Router();
const { verifyToken } = require('../controllers/authController');
const db = require('../database/db');

// Get user profile
router.get('/profile', verifyToken, async (req, res) => {
  try {
    const userId = req.userId; // Set in verifyToken middleware
    const user = await db.default.oneOrNone('SELECT email FROM users WHERE id = $1', [userId]);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ email: user.email });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch user profile" });
  }
});

module.exports = router;
