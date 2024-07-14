const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors'); // Import CORS

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://127.0.0.1:5500", // Allow all origins for testing purposes; you can specify the origin as needed
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
    credentials: true
  }
});

// Use CORS middleware for Express
app.use(cors());

//Node Server which will handle socket.io connections
//io ko initialize kar liya aur 5000 port pe apna server run kiya aur socket.io link kiya
//socket.io server jo hai wo incoming events ko listen karega
const users = {};

//io.on ek socket.io instance hai jo ki bahut sare sockets connection ko listen karega, koi bhi connect karta hai to
//aur jab koi connect kare to us particular connection ke sath kya hona chahiye wo hamara socket.on hai

io.on("connection", (socket) => {
  socket.on("new-user-joined", (username) => {
    users[socket.id] = username; //socket.id is a key for users....jaise hi user-joined event mila to jo username hai usko users ke andar set kar dunga.
    socket.broadcast.emit("user-joined",username); // it will show other users that a new user is joined.
  });
  socket.on("send",message=>{
    socket.broadcast.emit("receive",{message: message, username: users[socket.id]})

  });
socket.on('disconnect',message=>{
  socket.broadcast.emit('left',users[socket.id]);
  delete users[socket.id];
})

}); 

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Listening on *:${PORT}`);
});
