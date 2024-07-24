//routes/leltarRoutes.js
var __importDefault = (this && this.__importDefault) || function (mod) {
  return mod && mod.__esModule ? mod : { default: mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const router = express.Router();
const { checkExcelIdExists } = require('../controllers/leltarController');
const { verifyToken } = require('../controllers/authController');
const leltar = require('../leltar');

// Ellenőrizzük az Excel ID létezését
router.get("/check-excelid", checkExcelIdExists);

// Új rekord hozzáadása a leltárhoz
router.post('/leltar', verifyToken, leltar.addLeltar);

module.exports = router;
 