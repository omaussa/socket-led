var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var Gpio = require('onoff').Gpio,
  led = new Gpio(17, 'out'),
  ledm = new Gpio(27, 'out');


server.listen(3000, function(){
    console.log('Servidor corriendo en http://localhost:3000');
});


io.on('connection', function(socket) {
    console.log('Conexión nueva');
    socket.emit('message', 'Connected');

    socket.on('turnon', function(data){
        console.log(data);
        socket.emit('message', 'Encendido');
        led.writeSync(0);
        ledm.writeSync(1);
    });
    
    socket.on('turnoff', function(data){
        console.log(data);
        socket.emit('message', 'Apagado');
        led.writeSync(1);
        ledm.writeSync(0);
    });

});
