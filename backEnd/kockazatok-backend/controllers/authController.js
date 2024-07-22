var __importDefault = (this && this.__importDefault) || function (mod) {
  return mod && mod.__esModule ? mod : { default: mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const { hash_password, compare_password } = require("../utils/helpers");
const db = __importDefault(require("../database/db")); // Import pg-promise db instance

// Function for verifying JWT token
const verifyToken = (req, res, next) => {
  const auth_header = req.headers["authorization"];
  if (auth_header) {
    const token = auth_header.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: "authcontroller.js: Érvénytelen token" });
      } else {
        req.userId = decoded.userId;
        next();
      }
    });
  } else {
    return res.status(401).json({ error: "authcontroller.js: Nincs megadva token" });
  }
};

// User registration function
const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      return res.status(400).json({ error: "Email field is required" });
    }
    if (!password) {
      return res.status(400).json({ error: "Password field is required" });
    }

    const user = await db.default.oneOrNone("SELECT * FROM users WHERE email = $1", [email]);

    if (user) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const hashedPassword = hash_password(password);

    const newUser = await db.default.one(
      "INSERT INTO users(email, password_hash, role) VALUES($1, $2, $3) RETURNING id",
      [email, hashedPassword, 1] // Setting role to 1 for registered users
    );

    const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });

    res.json({ message: "User registered successfully", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Registration failed" });
  }
};

// User bejelentkezes function
const bejelentkezes = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      return res.status(400).json({ error: "Email field is required" });
    }
    if (!password) {
      return res.status(400).json({ error: "Password field is required" });
    }

    const user = await db.default.oneOrNone("SELECT * FROM users WHERE email = $1", [email]);

    if (!user) {
      return res.status(404).json({ error: "Nincs ilyen fiók" });
    }

    const passwordMatch = compare_password(password, user.password_hash);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid password" });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });

    res.json({ message: "bejelentkezes successful", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "bejelentkezes failed" });
  }
};

// Fiók adat lekérése
const getFiokom = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await db.default.oneOrNone("SELECT email FROM users WHERE id = $1", [userId]);
    
    if (!user) {
      return res.status(404).json({ error: "Nincs ilyen fiók" });
    }
    
    res.json({ email: user.email });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch user profile" });
  }
};

module.exports = {
  verifyToken,
  register,
  bejelentkezes,
  getFiokom,
};
