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
    
    .focus()
    
    .val('')
    
    .on('blur', function(){
        
        const tmp = $(this).val();

        if ($('#room-select').val()){
            $(this).val($('#room-select').val())
        }else{
            $(this).val(tmp)
        }
        
    })
});

$('#room-select').change(function(){
    let roomSelect = $(this).val();
    $('#new-room-input').val(roomSelect);
})