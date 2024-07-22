"use strict";
require('dotenv').config();
var __importDefault = (this && this.__importDefault) || function (mod) {
  return mod && mod.__esModule ? mod : { default: mod };
};
Object.defineProperty(exports, "__esModule", { value: true });

const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./database/db")); // Biztos, hogy az itt megfelelő adatbázis példányt importálod
const cors = require("cors");
const app = (0, express_1.default)();

const PORT = process.env.PORT || 3000;
const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());

const authRoute = require("./routes/authRoutes");
const profileRoute = require("./routes/profileRoute");
const { verifyToken } = require("./controllers/authController");

app.use('/auth', authRoute);
app.use('/fiokom', profileRoute);

app.get("/", (req, res) => {
  res.send("Welcome to the Kockazatok API");
});

app.get("/kockazatok-all", async (req, res) => {
  try {
    const kockazat = await db_1.default.any("SELECT * FROM kockazat");
    res.json(kockazat);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/kockazatok", async (req, res) => {
  const { tevid, fcsopid, folyid } = req.query;

  try {
    const kockazat = await db_1.default.any("SELECT * FROM kockazat WHERE tevid = $1 AND fcsopid = $2 AND folyid = $3", [tevid, fcsopid, folyid]);

    if (!kockazat || kockazat.length === 0) return res.status(404).json({ message: "kockazat not found" });
    res.json(kockazat);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/folyamat", cors(corsOptions), async (req, res) => {
  const { tevid, fcsopid } = req.query;
  let query = "SELECT DISTINCT tevid, tev, fcsopid, fcsop, folyid, foly FROM folyamat";
  const conditions = [];
  const params = [];

  if (tevid) {
    conditions.push("tevid = $" + (conditions.length + 1));
    params.push(tevid);
  }

  if (fcsopid) {
    conditions.push("fcsopid = $" + (conditions.length + 1));
    params.push(fcsopid);
  }

  if (conditions.length > 0) {
    query += " WHERE " + conditions.join(" AND ");
  }

  try {
    const result = await db_1.default.any(query, params);
    res.json(result);
  } catch (error) {
    console.error("Detailed error:", error); // Detailed error logging
    res.status(500).json({ error: error.message, stack: error.stack });
  }
});

app.post("/kockazatok", async (req, res) => {
  const { title, description } = req.body;
  if (!title || !description) {
    return res.status(400).json({ error: "Title and description are required" });
  }
  try {
    const kockazat = await db_1.default.one("INSERT INTO kockazat(title, description) VALUES($1, $2) RETURNING *", [title, description]);
    res.status(201).json(kockazat);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put("/kockazatok/:id", async (req, res) => {
  try {
    const updatedKockazat = await db_1.default.oneOrNone("UPDATE kockazat SET title = $1, description = $2 WHERE id = $3 RETURNING *", [req.body.title, req.body.description, parseInt(req.params.id)]);
    if (!updatedKockazat) return res.status(404).json({ message: "Kockazat not found" });
    res.json(updatedKockazat);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete("/kockazatok/:id", async (req, res) => {
  try {
    const result = await db_1.default.result("DELETE FROM kockazat WHERE id = $1", [parseInt(req.params.id)]);
    if (!result.rowCount) return res.status(404).json({ message: "kockazat not found" });
    res.json({ message: "kockazat deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/:universalURL", (req, res) => {
  res.send("404 URL NOT FOUND");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
