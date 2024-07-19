"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./db"));
const cors = require("cors");
const app = (0, express_1.default)();
const PORT = 3000;
const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));
app.use(express_1.default.json());

app.get("/", (req, res) => {
  res.send("Welcome to the Kockazatok API");
});

// GET all kockazats
app.get("/kockazatok-all", cors(corsOptions), async (req, res) => {
  try {
    const kockazat = await db_1.default.any("SELECT * FROM kockazat");
    res.json(kockazat);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET a list of kockazat by IDs
app.get("/kockazatok", cors(corsOptions), async (req, res) => {
  const { tevid, fcsopid, folyid } = req.query;

  try {
    const kockazat = await db_1.default.any("SELECT * FROM kockazat WHERE tevid = $1 AND fcsopid = $2 AND folyid = $3", [tevid, fcsopid, folyid]);

    if (!kockazat) return res.status(404).json({ message: "kockazat not found" });
    res.json(kockazat);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
/* app.get('/kockazatok/:id', cors(corsOptions), async (req, res) => {
    try {
        const kockazat = await db_1.default.oneOrNone('SELECT * FROM kockazat WHERE id = $1', [parseInt(req.params.id)]);
        if (!kockazat)
            return res.status(404).json({ message: 'kockazat not found' });
        res.json(kockazat);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}); */

// Folyamatok lekérése a megfelelő szűrőkkel
app.get("/folyamat", cors(corsOptions), async (req, res) => {
  const { tevid, fcsopid } = req.query;
  let query = "SELECT DISTINCT tevid, tev, fcsopid, fcsop, folyid, foly FROM folyamat";
  const conditions = [];
  const params = [];

  conditions.push("tevid = $" + (conditions.length + 1));
  params.push(tevid);

  conditions.push("fcsopid = $" + (conditions.length + 1));
  params.push(fcsopid);

  if (conditions.length > 0) {
    query += " WHERE " + conditions.join(" AND ");
  }

  try {
    const result = await db_1.default.any(query, params);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST a new kockazat
app.post("/kockazatok", cors(corsOptions), async (req, res) => {
  const { title, description } = req.body;
  // Check if title and description are provided
  if (!title || !description) {
    return res.status(400).json({ error: "Title and description are required" });
  }
  try {
    const kockazat = await db_1.default.one("INSERT INTO kockazat(title, description) VALUES($1, $2) RETURNING *", [title, description]);
    res.status(201).json(kockazat);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
});

// PUT (update) a kockazat by ID
app.put("/kockazatok/:id", cors(corsOptions), async (req, res) => {
  try {
    const updatedKockazat = await db_1.default.oneOrNone("UPDATE kockazat SET title = $1, description = $2 WHERE id = $3 RETURNING *", [req.body.title, req.body.description, parseInt(req.params.id)]);
    if (!updatedKockazat) return res.status(404).json({ message: "Kockazat not found" });
    res.json(updatedKockazat);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE a kockazat by ID
app.delete("/kockazatok/:id", cors(corsOptions), async (req, res) => {
  try {
    const result = await db_1.default.result("DELETE FROM kockazat WHERE id = $1", [parseInt(req.params.id)]);
    if (!result.rowCount) return res.status(404).json({ message: "kockazat not found" });
    res.json({ message: "kockazat deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 404 handler
app.get("/:universalURL", (req, res) => {
  res.send("404 URL NOT FOUND");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
