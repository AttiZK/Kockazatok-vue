var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const db = __importDefault(require("../database/db")); // Import pg-promise db instance

const checkExcelIdExists = async (req, res) => {
  const { excelId } = req.query; // Feltételezzük, hogy az excelId-t query paraméterként küldöd
  try {
    const result = await db.default.oneOrNone("SELECT * FROM leltar WHERE excelid = $1", [excelId]);
    if (result) {
      res.json({ exists: true });
    } else {
      res.json({ exists: false });
    }
  } catch (error) {
    console.error("Error checking excelId:", error);
    res.status(500).json({ error: "Failed to check excelId" });
  }

  module.exports = {
    checkExcelIdExists,
  };
};
