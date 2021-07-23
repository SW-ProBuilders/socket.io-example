const path = require("path");
const {createServer} = require("http");
const express = require("express");
const app = express();
const server = createServer(app);

const io = require("socket.io")(server);

//Connected event
io.on('connection', (socket) => {
    console.log("Connected");

    //Event recieved by server from client
    socket.on("ping", (args) => {
      console.log(`PONG (${args})`)

      //reply with different event
      socket.emit("pong", args)
    })
});


//webserver bullshit
app.all('/', function (req, res, next) {
    res.sendFile(path.join(__dirname)+"/index.html")
})

server.listen(8080, () => {
    console.log("started server on http://localhost:8080");
});
