let socket = io();

function scrollToBottom() {
    // Selectors
    const messages = jQuery('#messages');
    const newMessage = messages.children('li:last-child')
    // Heights
    const clientHeight = messages.prop('clientHeight');
    const scrollTop = messages.prop('scrollTop');
    const scrollHeight = messages.prop('scrollHeight');
    const newMessageHeight = newMessage.innerHeight();
    const lastMessageHeight = newMessage.prev().innerHeight();

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        messages.scrollTop(scrollHeight);
    }
}

socket.emit('getTitle', $.deparam(window.location.search).room);

socket.on('createTitle', function (title) {
    const h4 = $('<h4></h4>');
    const h3 = $('<h3></h3>');

    h4.append('Room:');
    h3.append(title.charAt(0).toUpperCase() + title.slice(1).toLowerCase());

    $('#room-title').append(h4).append(h3);
})

socket.on('connect', function () {
    const params = $.deparam(window.location.search);
    params.room = params.room.toLowerCase();

    socket.emit('join', params, function (err) {
        if (err) {
            alert(err);
            window.location.href = '/';
        } else {
            console.log('No error');
        }

    });
});

socket.on('disconnect', function () {
    console.log('Disconnected from server')
});

socket.on('updateUserList', function (users) {
    const ol = $('<ol></ol>');

    users.forEach(function (user) {
        ol.append($('<li></li>').text(user));
    });

    $('#users').html(ol);
});

socket.on('newMessage', function (message) {
    const formattedTime = moment(message.createdAt).format('h:mm a');
    const template = $('#message-template').html();
    const html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    });

    $('#messages').append(html);
    scrollToBottom();
});

socket.on('newLocationMessage', function (message) {
    const formattedTime = moment(message.createdAt).format('h:mm a');
    const template = $('#location-message-template').html();
    const html = Mustache.render(template, {
        from: message.from,
        url: message.url,
        createdAt: formattedTime
    });

    $('#messages').append(html);
    scrollToBottom();
});

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
});