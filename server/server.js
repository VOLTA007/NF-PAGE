const http = require('http');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import CORS module
// const socketIo = require('socket.io'); 

const app = express();
const server = http.createServer(app);

// Enable CORS for all routes (adjust if needed)
const io = require('socket.io')(server, {
  cors:{
   origin: '*',
   methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'], 
   credentials: true,
   optionsSuccessStatus: 204,
  }
});


app.use(cors());  



// Connect to MongoDB (replace with your connection string)
mongoose.connect('mongodb+srv://volta0007:X5913lock1@cluster0.l8jlgt1.mongodb.net/UserLogin')
.then(() => {
  console.log("Connected to MongoDB");
}).catch(err => {
  console.error("MongoDB connection error:", err);
});

// Get the UserLogin model (replace with your model path)
const UserLogin = require('../models/UserLogin');

// Listen for changes in the MongoDB UserLogin collection
const changeStream = UserLogin.watch();

changeStream.on('change', change => {
  console.log("Emitting dataUpdate event with change:", change);
  // Push updated data to clients
  io.emit('dataUpdate', change);
});

// Start the server
const PORT = process.env.PORT || 3001; // Use environment variable or default to 3001
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
























// const http = require('http');

// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors'); // Import cors module

// const socketIo = require('socket.io-client');
// const io = socketIo();

// const app = express();
// app.use(cors()); // Enable CORS for all routes in your Express app

// const server = http.createServer(app);

// io.on('connection', socket => {
//   socket.handshake.headers.origin = 'http://localhost:3000';
//   socket.emit('Access-Control-Allow-Origin', 'http://localhost:3000');
// });



// // Connect to MongoDB
// mongoose.connect('mongodb+srv://volta0007:X5913lock1@cluster0.l8jlgt1.mongodb.net/UserLogin',).then(() => {
//   console.log("Connected to MongoDB");
// }).catch(err => {
//   console.error("MongoDB connection error:", err);
// });

// // Get the UserLogin model
// const UserLogin = require('../models/UserLogin');

// // Listen for changes in the MongoDB UserLogin collection
// const changeStream = UserLogin.watch();

// changeStream.on('change', change => {
//   console.log("Emitting dataUpdate event with change:", change);
//   // Push updated data to clients
//   io.emit('dataUpdate', change);
// });

// // Start the server
// const PORT = process.env.PORT || 3001;
// server.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
