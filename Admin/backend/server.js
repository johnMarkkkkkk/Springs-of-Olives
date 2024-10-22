const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const connectDB = require('./config/db');
require('dotenv').config();

// Route imports
const customerRoutes = require('./routes/customerRoutes');
const menuRoutes = require('./routes/menuRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');

// Initialize the app
const app = express();
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

// API routes
app.use('/api/customers', customerRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/feedback', feedbackRoutes);

// Start the server with Socket.io
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*", // Change this to your frontend URL
    },
});

// Socket.io connection for real-time updates
io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

// Listen to changes in MongoDB collections and emit to the clients
const changeStream = mongoose.connection.collection('customers').watch();
changeStream.on('change', (change) => {
    io.emit('customerChange', change);
});

const port = process.env.PORT || 5000;
server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
