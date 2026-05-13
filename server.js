const http = require("http");

const app = require("./src/app");

const server = http.createServer(app);

const { Server } = require("socket.io");

const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

// SOCKET CONNECTION
io.on("connection", (socket) => {

  console.log("User Connected:", socket.id);

  // DRIVER LOCATION UPDATE
  socket.on("driver-location", async (data) => {

    console.log("Driver Location:", data);

    // later:
    // update firestore
    // emit to user

  });

  socket.on("disconnect", () => {
    console.log("User Disconnected");
  });

});

server.listen(5000, "0.0.0.0", () => {
  console.log("Server running on port 5000");
});