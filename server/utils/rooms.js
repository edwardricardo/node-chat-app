const rooms = [];

//createRoom
const createRoom = (room) =>{    
    const exist = rooms.indexOf(room);

    if (exist === -1){
        return false;
    }
    
    rooms.push(room);
}

//getRoom
const getRoom = (room) => {
    return rooms.indexOf(room);
}

//closeRoom
const closeRoom = (room) =>{

}

//GetRooms
const getRooms = () => {
    return rooms;
}

module.exports = {createRoom, getRoom, closeRoom, getRooms}