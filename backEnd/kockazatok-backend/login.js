const db = require('./database/db'); 
const bcrypt = require('bcryptjs');

exports.bejelentkezes = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await db.any('SELECT * FROM users WHERE email=$1', [email]);
    const user = result[0];

    if (!user) {
      return res.status(401).send('Invalid credentials');
    }

    const validPassword = await bcrypt.compare(password, user.password_hash);
    if (!validPassword) {
      return res.status(401).send('Invalid credentials');
    }

    // Itt kezdhetjük el generálni a session-t vagy token-t
    res.send('Logged in successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

exports.register = async (req, res) => {
  const { email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await db.none('INSERT INTO users(email, password_hash) VALUES($1, $2)', [email, hashedPassword]);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};