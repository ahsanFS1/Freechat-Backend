const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

const userRoutes = require("./Routes/users.routes");
const postRoutes = require("./Routes/posts.routes");
const likeRoutes = require("./Routes/likes.routes");
const messageRoutes = require("./Routes/message.routes.js");
const { setupMessageSocket } = require("./Sockets/message.socket.js");


const allowedOrigins = [
  "http://localhost:5173",
];


app.use(cors({
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));


const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
  }
});

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/posts", likeRoutes);
app.use("/api", messageRoutes);



setupMessageSocket(io);

server.listen(3000, "0.0.0.0", () => {
  console.log("Server running at http://localhost:3000");
});
