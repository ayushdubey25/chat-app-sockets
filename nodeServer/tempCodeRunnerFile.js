//Node Server which will handle socket.io connections
const io = require('socket.io')(5000); //io ko initialize kar liya aur 5000 port pe apna server run kiya aur socket.io link kiya
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
}); 
