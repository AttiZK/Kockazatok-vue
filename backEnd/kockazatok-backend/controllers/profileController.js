var __importDefault = (this && this.__importDefault) || function (mod) {
  return mod && mod.__esModule ? mod : { default: mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db = __importDefault(require("../database/db")); // Import pg-promise db instance

// Function for retrieving user details
const fiokom = async (req, res) => {
  try {
    const user = await db.default.oneOrNone("SELECT role, email FROM users WHERE id = $1", [req.userId]);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ email: user.email });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching fiokom" });
  }
};

module.exports = {
  fiokom,
};
