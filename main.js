// Import the Express module
const express = require('express');

// Create an instance of Express
const app = express();

// Define a route handler for the root URL ('/')
app.get('/', (req, res) => {
  // Send a response to the client
  res.send('Hello we are testing!');
});

// Start the server on port 3000
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
