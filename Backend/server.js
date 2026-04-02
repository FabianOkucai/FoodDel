const express = require('express');
const cors = require('cors');
const http = require('http');
const connectDB = require('./config/db.js');
const { initSocket } = require('./config/socket.js');
const foodRouter = require('./routes/foodRoute.js');
const authRouter = require('./routes/authRoute.js');
const orderRouter = require('./routes/orderRoute.js');

const app = express();
const httpServer = http.createServer(app);
const port = process.env.PORT || 4001;

// Initialize Socket.io
const io = initSocket(httpServer);

// Middleware
app.use(express.json());
app.use(cors());

// Database connection
connectDB();

// API endpoints
app.use("/api/auth", authRouter);
app.use("/api/food", foodRouter);
app.use("/api/orders", orderRouter);
app.use("/images", express.static('uploads'));

app.get("/", (req, res) => {
  res.send("API Working");
});

// Server start
httpServer.listen(port, () => {
  console.log(`Server Started on http://localhost:${port}`);
});

