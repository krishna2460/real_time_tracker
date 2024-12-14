

const express = require("express");
const app = express();
const http = require("http");
const socketio = require("socket.io");
const path = require('path');  // Required path module

require('dotenv').config();
const PORT = process.env.PORT || 3000;

const server = http.createServer(app);
const io = socketio(server);

// Set up view engine
app.set("view engine", "ejs");

// Serve static files from 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

io.on("connection" , function(socket){
    socket.on("send-location",function(data){
        io.emit("receive-location",{id: socket.id, ...data});


    });

    socket.on("disconnect",function(){
  io.emit("user-disconnected",socket.id);
    });
});

// Root route
app.get("/", function (req, res) {
    res.render("index");
});

// Start server
server.listen(PORT, () => {
    console.log('Server is running on 3000');
});

