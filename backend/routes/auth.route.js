// routes/auth.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/db.js');
require('dotenv').config();

const router = express.Router();

// Signup
router.post('/signup', async (req, res) => {
  const { id,name,email, password,  } = req.body;

  try {
    // Check if user exists
    const existingUser = await pool.query('SELECT * FROM user_login WHERE email = $1 or id = $2', [email,id]);
    if (existingUser.rows.length > 0) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query('INSERT INTO user_login (id,name,email, password) VALUES ($1, $2,$3,$4)', [id,name,email, hashedPassword]);

    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { id,email, password } = req.body;

  try {
    const result = await pool.query('SELECT * FROM user_login WHERE email = $1 and id = $2', [email,id]);
    const user = result.rows[0];
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '10h' });
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
