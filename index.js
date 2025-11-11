const net = require("net");
const mongoose = require("mongoose");
require("dotenv").config();

const PORT = 50100;

// Connect to MongoDB via Mongoose
mongoose.set("strictQuery", true);

mongoose
  .connect(process.env.mongodbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB via Mongoose"))
  .catch((err) => console.error("MongoDB connection error:", err));

// TCP server for GPS tracker
const server = net.createServer((socket) => {
  console.log("Tracker connected:", socket.remoteAddress, socket.remotePort);

  socket.on("data", (data) => {
    const message = data.toString().trim();
    console.log("Received from tracker:", message);
  });

  socket.on("end", () => {
    console.log("Tracker disconnected");
  });

  socket.on("error", (err) => {
    console.error("Socket error:", err);
  });
});

server.listen(PORT, () => {
  console.log(`TCP server listening on port ${PORT}`);
});
