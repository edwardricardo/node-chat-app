let socket = io();

socket.on('connect', function () {
    socket.on('getRooms', function (rooms) {
        if (rooms) {
            rooms.forEach(function (room) {
                $('#room-select')
                .append($('<option></option>')
                .text(room.charAt(0).toUpperCase() + room.slice(1)));
            });
        }
    });
});

$('#new-room-btn').on('click', function(e){
    e.preventDefault();

    $('#room-select').val('')

    $('#new-room-input')
    .slideToggle('fast')    
    .focus()    
    .val('')    
    .on('blur', function(){        
        const tmp = $(this).val();
        if ($('#room-select').val()){
            $(this).val($('#room-select').val())
        }else{
            $(this).val(tmp)
        }
    }).keypress(function(e){
        if (e.which == 13) {
            $('#join-form').submit();
            return false;
        }
    })
});

$('#room-select').change(function(){
    let roomSelect = $(this).val();

    if ($('#new-room-input').is(':visible')) {
        $('#new-room-input').slideToggle('fast', function(){
            $('#new-room-input').val(roomSelect);
        });
    }else{
        $('#new-room-input').val(roomSelect);
    }
})