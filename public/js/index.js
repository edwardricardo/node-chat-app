let socket = io();

socket.on('connect', function () {
    console.log('Connected to server')

    /*socket.emit('createEmail', {
        to: 'jen@example.com',
        text: 'Hey, This is Edward.'
    });*/

    socket.emit('createMessage', {
        from: '@jane',
        text: 'Message test from Jane'
    })
});

socket.on('disconnect', function () {
    console.log('Disconnected from server')
});

/*socket.on('newEmail', function(email){
    console.log('New Email', email)
})*/

socket.on('newMessage', function(message){
    console.log('New Message', message)
})