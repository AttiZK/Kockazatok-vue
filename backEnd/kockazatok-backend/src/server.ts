import express, { Request, Response } from 'express';
import db from './db';
const cors = require('cors');
const app = express();
const PORT = 3000;

const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));

app.use(express.json());
console.log('start');
interface Task {
  id: number;
  title: string;
  description: string;
}

// GET all kockazat
app.get('/kockazat', cors(corsOptions), async (req: Request, res: Response) => {
  try {
    const kockazat = await db.any('SELECT * FROM kockazat');
    res.json(kockazat);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// GET a specific task by ID
app.get('/kockazat/:id', cors(corsOptions), async (req: Request, res: Response) => {
  try {
    const task = await db.oneOrNone('SELECT * FROM kockazat WHERE id = $1', [parseInt(req.params.id)]);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// POST a new task
app.post('/kockazat', cors(corsOptions), async (req: Request, res: Response) => {
  const { title, description } = req.body;

  // Check if title and description are provided
  if (!title || !description) {
    return res.status(400).json({ error: 'Title and description are required' });
  }

  try {
    const task = await db.one('INSERT INTO kockazat(title, description) VALUES($1, $2) RETURNING *', [
      title,
      description,
    ]);
    res.status(201).json(task);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
});

// PUT (update) a task by ID
app.put('/kockazat/:id', cors(corsOptions), async (req: Request, res: Response) => {
  try {
    const updatedTask = await db.oneOrNone(
      'UPDATE kockazat SET title = $1, description = $2 WHERE id = $3 RETURNING *',
      [req.body.title, req.body.description, parseInt(req.params.id)]
    );
    if (!updatedTask) return res.status(404).json({ message: 'Task not found' });
    res.json(updatedTask);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE a task by ID
app.delete('/kockazat/:id', cors(corsOptions), async (req: Request, res: Response) => {
  try {
    const result = await db.result('DELETE FROM kockazat WHERE id = $1', [parseInt(req.params.id)]);
    if (!result.rowCount) return res.status(404).json({ message: 'Task not found' });
    res.json({ message: 'Task deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
