import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000", "http://192.168.0.100:3000"],
    methods: ["GET", "POST"],
  },
});

const activeUsers = {};

io.on("connection", (socket) => {
  socket.on("move-cursor", (username, x, y) => {
    activeUsers[socket.id] = {
      id: socket.id,
      username: username || "anonymous",
      x,
      y,
    };

    socket.broadcast.emit("update-cursor", { id: socket.id, username, x, y });
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
    delete activeUsers[socket.id];
    io.emit("user-left", socket.id);
  });
});

app.get("/", (req, res) => {
  res.send("Socket backend running.");
});

server.listen(4000, "0.0.0.0", () => {
  console.log(
    "Socket server is running on http://localhost:4000 or http://192.168.0.100:4000",
  );
});
