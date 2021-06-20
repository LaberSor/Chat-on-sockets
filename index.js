var express = require('express');
var app = express();
var server = require('http').createServer(app);
server.listen(3000);
var io = require('socket.io')(server);

app.get('/', function(request, response){
    response.sendFile(__dirname + '/index.html');
});

users = [];
connections = []; 

io.sockets.on('connection', function(socket) {
    console.log("Успешное соединение");
    connections.push(socket);

    socket.on('disconnect', function(data) {
        connections.splice(connections.indexOf(socket), 1);
        console.log("Успешное отключение");
    });

    socket.on('send mess', function(data) {
        io.sockets.emit('add mess', {mess: data.mess, name: data.name, className: data.className});
    });
});