let socket = io();

socket.on('connect', function () {
    
    socket.on('getRooms', function (rooms) {
        if (!rooms) {
            console.log('No rooms');
        } else {
            console.log(rooms);

            const select = $('#room-select');

            rooms.forEach(function (room) {
                select.append($('<option></option>').text(room));
            });

        }
    });

});




$('#new-room-btn').on('click', function(e){
    e.preventDefault();

    $('#new-room-input').slideToggle("slow");
});

$('#room-select').change(function(){
    let roomSelect = $(this).val();

    $('#new-room-input').val(roomSelect);
})