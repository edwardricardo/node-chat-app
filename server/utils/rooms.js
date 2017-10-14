const rooms = [];

//createRoom
const createRoom = (room) =>{
    const allRooms = rooms.toString().toLowerCase().split(',');
    if(allRooms.indexOf(room.toLowerCase()) === -1){
        rooms.push(room);
    }
}

//closeRoom
const closeRoom = (room) =>{
    const posRoom = rooms.indexOf(room);
    if(posRoom != -1){ rooms.splice(posRoom, 1); }
}

//GetRooms
const getRooms = () => {
    return rooms;
}

module.exports = { createRoom, closeRoom, getRooms }