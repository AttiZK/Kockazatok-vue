//controllers/leltarController.js
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const db = __importDefault(require("../database/db")); // Import pg-promise db instance

const checkExcelIdExists = async (req, res) => {
  const { excelId, userId } = req.query;
    console.log('Query Parameters:', req.query);
  try {
    const result = await db.default.oneOrNone("SELECT * FROM leltar WHERE excelid = $1", [excelId]);
    const response = {
      excelId: excelId,
      userId: userId,
      exists: !!result, // Az exists érték true, ha van találat, false ha nincs
    };

    res.json(response); 
  } catch (error) {
    console.error("Error checking excelId:", error);
    res.status(500).json({ error: "Failed to check excelId" });
  }
};

module.exports = {
  checkExcelIdExists,
};
 