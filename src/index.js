var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var gpio = require('pi-gpio');

gpio.open(16, "output", function(err) {		// Open pin 16 for output
	gpio.write(16, 1, function() {			// Set pin 16 high (1)
		gpio.close(16);						// Close pin 16
	});
});

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