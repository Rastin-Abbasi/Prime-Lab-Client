// Import necessary modules
const express = require('express');
const routes = require('./routes');
const errorHandler = require('./errorHandler');

// Initialize Express app
const app = express();

// Set up middleware
app.use(express.json());

// Connect to the database

// Define main logic for handling incoming requests and responses
app.use('/api', routes);

// Error handling middleware
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
