const express = require('express');
const bcrypt = require('bcrypt'); // Used to hash passwords
const jwt = require('jsonwebtoken'); // Used to create JWT tokens
const pool = require('./db'); // Import database connection

const router = express.Router();

// Sign Up Route (User Registration)
router.post('/signup', async (req, res) => {
  const { email, phone, password } = req.body;

  // Validate input fields
  if (!email || !phone || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Check if the user already exists
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password before storing
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user into the database
    const newUser = await pool.query(
      'INSERT INTO users (email, phone, password) VALUES ($1, $2, $3) RETURNING *',
      [email, phone, hashedPassword]
    );

    return res.status(201).json({
      message: 'User created successfully',
      user: {
        email: newUser.rows[0].email,
        phone: newUser.rows[0].phone,
      }, // Returning only the email and phone, not the password
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error registering user' });
  }
});

// Login Route (User Authentication)
router.post('/Login', async (req, res) => {
  const { email, password } = req.body;

  // Validate input fields
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    // Get the user from the database by email
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare the entered password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token for the user
    const token = jwt.sign({ userId: user.id }, 'your_jwt_secret', { expiresIn: '1h' });

    return res.status(200).json({ message: 'Login successful', token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error logging in' });
  }
});

module.exports = router;
