//leltar.js
require("dotenv").config();
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });

const express = require("express");
const router = express.Router();
const db = __importDefault(require("./database/db"));
const { checkLeltarExists } = require("./controllers/leltarController"); // Import the checkLeltarExists function


const addLeltar = async (req, res) => {
  const { kockcsop, nev, ok, kov, kontr, tevid, fcsopid, folyid, excelid } = req.body;
  const userId = req.userId;
  console.log("Authenticated user ID:", userId); // Add this line for debugging
  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  try {
    // Először ellenőrizzük, hogy létezik-e már az userId és excelid páros
    const existing = await db.default.oneOrNone(`SELECT id FROM leltar WHERE userId = $1 AND excelid = $2`, [userId, excelid]);

    if (existing) {
      throw new Error(`A record with userId ${userId} and excelid ${excelid} already exists.`);
    }
    const result = await db.default.one(
      `INSERT INTO leltar (userId, kockcsop, nev, ok, kov, kontr, tevid, fcsopid, folyid, excelid, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
       RETURNING id`,
      [userId, kockcsop, nev, ok, kov, kontr, tevid, fcsopid, folyid, excelid]
    );
    res.status(201).json({ id: result.id });
  } catch (error) {
    console.error("Error adding to leltar:", error);
    res.status(500).json({ error: "Failed to add to leltar" });
  }
};
router.get("/check-excelid", checkLeltarExists);
router.post("/leltar", addLeltar);

module.exports = router;
module.exports.addLeltar = addLeltar;
 