var express = require('express');
var app = express();
var http = require('http').Server(app);

var io = require('socket.io')(http);



// Static files
app.use(express.static('public'));


io.on('connection', (socket) => {

    console.log('made socket connection', socket.id);
    socket.on('disconnect', function(){
      console.log('user disconnected');
    });

    // Handle chat event
    socket.on('chat', function(data){
        // console.log(data);
        io.sockets.emit('chat', data);
    });

    // Handle typing event
    socket.on('typing', function(data){
        socket.broadcast.emit('typing', data);
    });

});


http.listen(4000, function(){
    console.log('listening for requests on port 4000,');
});
