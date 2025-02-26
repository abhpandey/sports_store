const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import CORS middleware
const authRoutes = require('./authRoutes'); // Import the auth routes

const app = express();

// Enable CORS for all origins (or specify a particular origin like http://localhost:5173)
app.use(cors()); // Allow all origins for now, or specify your frontend URL like app.use(cors({ origin: 'http://localhost:5173' }));

app.use(bodyParser.json()); // Parse JSON request bodies
app.use('/api/auth', authRoutes); // Use auth routes for /api/auth endpoint

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
