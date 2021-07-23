const path = require("path");
const {createServer} = require("http");
const express = require("express");
const app = express();
const server = createServer(app);

const io = require("socket.io")(server);

//Send basic ticket data
io.on('connection', (socket) => {
    console.log("Connected");
    socket.on("ping", (args) => {
      console.log(`PONG (${args})`)
      socket.emit("pong", args)
    })
});

app.all('/', function (req, res, next) {
    res.sendFile(path.join(__dirname)+"/index.html")
})

server.listen(8080, () => {
    console.log("started server on http://localhost:8080");
});
