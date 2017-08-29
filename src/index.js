var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var gpio = require('rpi-gpio');

function write() {
    gpio.write(7, false, function(err) {
        if (err) throw err;
        console.log('Written to pin');
    });
}
gpio.setup(7, gpio.DIR_HIGH, write);

server.listen(3000, function(){
    console.log('Servidor corriendo en http://localhost:3000');
});


io.on('connection', function(socket) {
    console.log('Conexión nueva');
    socket.emit('message', 'Connected');

    socket.on('turnon', function(data){
        console.log(data);
        socket.emit('message', 'Recibido');
    });
    
    socket.on('turnoff', function(data){
        console.log(data);
    });

});