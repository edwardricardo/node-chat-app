const rooms = new Set();

//createRoom
const createRoom = (room) =>{
    rooms.add(room);
}

//closeRoom
const closeRoom = (room) =>{
    rooms.delete(room);
}

//GetRooms
const getRooms = () => {
    return Array.from(rooms);
}

module.exports = { createRoom, closeRoom, getRooms }