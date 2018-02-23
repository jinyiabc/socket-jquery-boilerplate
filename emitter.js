var io = require('socket.io-emitter')({ host: '127.0.0.1', port: 6379 });
var debug = require('debug')('io-emitter');

setInterval(function(){
  debug('emit time event');
  io.emit('time', new Date);
}, 5000);
