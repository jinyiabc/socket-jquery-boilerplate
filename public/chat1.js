$(function () {
  var socket = io('http://localhost:4000');
  $('#message').keypress(function(){
    socket.emit('typing', handle.value);
  });
  $('#send').click(function(){
    socket.emit('chat', {
        message: message.value,
        handle: handle.value
    });
    message.value = "";
  })


  // Listen for events
  socket.on('chat', function(data){
      feedback.innerHTML = '';
      output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
  });

  socket.on('typing', function(data){
      feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
  });

});
