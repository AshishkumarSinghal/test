import express from 'express';
import cors from 'cors';
import { getDb } from './db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;
let db;

const initializeDatabase = async () => {
  db = await getDb();
  await db.run(`CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT UNIQUE, password_hash TEXT, role TEXT, created_at TEXT);`);
  await db.run(`CREATE TABLE IF NOT EXISTS products (id INTEGER PRIMARY KEY AUTOINCREMENT, userId INTEGER, name TEXT, description TEXT, price REAL, image_url TEXT, available INTEGER, created_at TEXT);`);
  await db.run(`CREATE TABLE IF NOT EXISTS lookbook_images (id INTEGER PRIMARY KEY AUTOINCREMENT, userId INTEGER, image_url TEXT, caption TEXT, created_at TEXT);`);
  await db.run(`CREATE TABLE IF NOT EXISTS appointments (id INTEGER PRIMARY KEY AUTOINCREMENT, userId INTEGER, customer_name TEXT, customer_email TEXT, appointment_date TEXT, created_at TEXT);`);
  const userCount = await db.get(`SELECT COUNT(*) as count FROM users`);
  if (userCount.count === 0) {
    const hash = bcrypt.hashSync('SecurePass123!', 10);
    await db.run(`INSERT INTO users (email, password_hash, role, created_at) VALUES (?, ?, ?, ?)`, ['admin@ateliernorth.com', hash, 'admin', new Date().toISOString()]);
  }
};

app.post('/api/register', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email and password are required.' });
  const hash = bcrypt.hashSync(password, 10);
  try {
    const result = await db.run(`INSERT INTO users (email, password_hash, role, created_at) VALUES (?, ?, ?, ?)`, [email, hash, 'customer', new Date().toISOString()]);
    res.json({ id: result.lastID, email, role: 'customer' });
  } catch (error) {
    if (error.message.includes('UNIQUE constraint failed: users.email')) {
      return res.status(400).json({ error: 'Email already in use.' });
    }
    res.status(500).json({ error: 'Internal Server Error.' });
  }
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email and password are required.' });
  const user = await db.get(`SELECT * FROM users WHERE email = ?`, [email]);
  if (!user || !bcrypt.compareSync(password, user.password_hash)) {
    return res.status(401).json({ error: 'Invalid email or password.' });
  }
  const token = jwt.sign({ id: user.id, role: user.role }, 'your_secret_key');
  res.json({ token, user: { id: user.id, email: user.email, role: user.role } });
});

app.get('/api/products', async (req, res) => {
  const products = await db.all(`SELECT * FROM products WHERE available = 1`);
  res.json({ products });
});

app.get('/api/products/:id', async (req, res) => {
  const product = await db.get(`SELECT * FROM products WHERE id = ?`, [req.params.id]);
  if (!product) return res.status(404).json({ error: 'Product not found.' });
  res.json(product);
});

app.get('/api/lookbook', async (req, res) => {
  const images = await db.all(`SELECT * FROM lookbook_images`);
  res.json({ images });
});

app.post('/api/appointments', async (req, res) => {
  const { customer_name, customer_email, appointment_date } = req.body;
  if (!customer_name || !customer_email || !appointment_date) return res.status(400).json({ error: 'All fields are required.' });
  const newAppointment = await db.run(`INSERT INTO appointments (customer_name, customer_email, appointment_date, created_at) VALUES (?, ?, ?, ?)`, [customer_name, customer_email, appointment_date, new Date().toISOString()]);
  res.json({ id: newAppointment.lastID, customer_name, customer_email, appointment_date });
});

app.get('/api/appointments', async (req, res) => {
  // Assuming authentication middleware would be here
  const appointments = await db.all(`SELECT * FROM appointments`);
  res.json({ appointments });
});

const startServer = async () => {
  await initializeDatabase();
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
};

startServer().catch(err => {
  console.error(`Initialization failed: ${err.message}`);
});