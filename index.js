var debug = require('debug')('io-redis');
var express = require('express');
var app = express();
var server  = require('http').Server(app);
require('dotenv').config();
var redis = require('socket.io-redis');

server.listen(process.env.PORT || 4000, function(){
    debug('listening for requests on port:'+ process.env.PORT);
});

var io = require('socket.io')(server);

//Sending messages from the outside-world
var io_redis = io.adapter(redis({
    host: '127.0.0.1',
    port: 6379
}));


// Static files
app.use(express.static('public'));

// Custom namespaces
var chat = io_redis
  .of('/chat')
  .on('connection', (socket) => {

    debug('made socket connection', socket.id);
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


var typing = io_redis
  .of('/typing')
  .on('connection', (socket) => {

    console.log('made socket connection', socket.id);  //made socket connection /chat#6BC584gejBdVMhv6AAAE

    // Handle typing event
    socket.on('typing', function(data){
        socket.broadcast.emit('typing', data);

    });

});

var time = io_redis
    .on('connection',(socket) => {

      socket.on('ack', function (data,cb) {
        responseData = 'Acknowledgement:' + typeof(data) + data;
       cb(responseData);
      });

    });
