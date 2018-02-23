$(function () {

// Connected to custom namespace.
  var chat = io('/chat');
  var typing = io('/typing');


  $('#message').keypress(function(){
    typing.emit('typing', handle.value);
  });
  $('#send').click(function(){
    // Now that we are connected let's send our test call with callback
    chat.emit('chat', {
        message: message.value,
        handle: handle.value
    }, function(response){
      console.log(response);
    });
    message.value = "";
  })


  // Listen for events
  chat.on('chat', function(data){
      feedback.innerHTML = '';
      output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
  });

  typing.on('typing', function(data){
      feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
  });


  // // Sandbox
  // socket.on('news',function(data){
  //   console.log(data);
  //   socket.emit('my other event',{my:'data'});
  // });




});
