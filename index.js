var express = require('express');
var app = express();
var server  = require('http').Server(app);

var io = require('socket.io')(server);

server.listen(4000, function(){
    console.log('listening for requests on port 4000,');
});



// Static files
app.use(express.static('public'));

// Custom namespaces
var chat = io
  .of('/chat')
  .on('connection', (socket) => {

    console.log('made socket connection', socket.id);
    socket.on('disconnect', function(){
      console.log('user disconnected');
    });

    // Handle chat event
    socket.on('chat', function(data,callback){
      // the client passes 'callback' as a function. When we invoke the callback on the server
      // the code on the client side will run
        responseData = 'Acknoledgement:'+ JSON.stringify(data,null,4);
        callback(responseData);
        chat.emit('chat', data);
    });
    // // Handle typing event
    // socket.on('typing', function(data){
    //     socket.broadcast.emit('typing', data);
    //
    // });
});


var typing = io
  .of('/typing')
  .on('connection', (socket) => {

    console.log('made socket connection', socket.id);  //made socket connection /chat#6BC584gejBdVMhv6AAAE

    // Handle typing event
    socket.on('typing', function(data){
        socket.broadcast.emit('typing', data);

    });

});
