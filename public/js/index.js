let socket = io();

socket.on('connect', function () {
    socket.on('getRooms', function (rooms) {
        if (rooms) {
                rooms.forEach(function (room) {
                $('#room-select')
                .append($('<option></option>')
                .text(room));
            });
        }
    });
});

$('#new-room-btn').on('click', function(e){
    e.preventDefault();
    $('#new-room-input')
    .slideToggle('fast')
    .focus().val('')
    .on('blur', function(){
        $(this).val($('#room-select').val());
    })
});

$('#room-select').change(function(){
    let roomSelect = $(this).val();
    $('#new-room-input').val(roomSelect);
})