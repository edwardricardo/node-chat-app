let socket = io();

socket.on('connect', function () {
    console.log('Connected to server');
});

socket.on('disconnect', function () {
    console.log('Disconnected from server')
});

socket.on('newMessage', function(message){
    console.log('New Message', message);
    const li = $('<li></li>');
    li.text(`${message.from}: ${message.text}`)
    $('#messages').append(li);
})

socket.on('newLocationMessage', function (message) {
    
    const li = $('<li></li>');
    const a = $('<a target="_blank">My current location</a>')
    li.text(`${message.from}: `);
    a.attr('href', message.url);
    li.append(a);

    $('#messages').append(li);
})

$('#message-form').on('submit', function(e){
    e.preventDefault();

    let messageText = $('[name=message]');

    socket.emit('createMessage', {
        from: 'User',
        text: messageText.val()
    }, function(){
        messageText.val('');
    })
});

const locationButton = $('#send-location');
locationButton.on('click', function(){
    if(!navigator.geolocation){
        return alert('Geolocation not supported by your browser.');
    }

    locationButton.attr('disabled', 'disabled').text('Sending location...');

    navigator.geolocation.getCurrentPosition(function(position){
        locationButton.removeAttr('disabled').text('Send location');        
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })
    }, function(){
        locationButton.removeAttr('disabled').text('Send location');
        return alert('Unable to fetch location.')
    })
})