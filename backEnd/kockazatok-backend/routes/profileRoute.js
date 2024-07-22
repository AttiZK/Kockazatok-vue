var __importDefault = (this && this.__importDefault) || function (mod) {
  return mod && mod.__esModule ? mod : { default: mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const router = express.Router();
const { verifyToken, getFiokom } = require('../controllers/authController');
const db = __importDefault(require("../database/db"));

router.use(verifyToken);
router.use(getFiokom);
// Get fiokom
router.get('/fiokom', async (req, res) => {
  try {
    const userId = req.userId; // Set in verifyToken middleware
    const user = await db.default.oneOrNone('SELECT email FROM users WHERE id = $1', [userId]);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ email: user.email });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch fiokom" });
  }
});

module.exports = router;
