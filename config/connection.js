// In your config/connection.js file, establish a connection to your MongoDB Atlas database using Mongoose.
// Handle both successful connections and connection errors gracefully by logging appropriate messages to the console.
// Execute this connection logic from server.js. 

const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch((error) => console.error('Error connecting to MongoDB:', error));

module.exports = mongoose.connection;
