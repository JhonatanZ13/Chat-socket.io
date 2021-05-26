const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
//Crea server
//const server = http.createServer(app);

app.get('/', function(req, res){
    res.sendFile(__dirname + '/chat.html')
});


//Escucha coneccion
io.on('connect', function(socket){
    console.log("Se conecto un usuario: "+socket.id);

    var username;
    socket.on('crearUsuario', function(data){
        username = data;
    });

    socket.on('mensajeNuevo', function(data){
        socket.broadcast.emit('mensaje', {
            usuario: username,
            mensaje: data
        });
        socket.emit('mensaje', {
            usuario: username,
            mensaje: data
        });
    });
});

http.listen(3000, function(){
    console.log('Server listo')
});