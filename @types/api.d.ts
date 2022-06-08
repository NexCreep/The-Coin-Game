
/**
 * Declarations for route /api
 */


/**
 * Declarations for route /api/room
 */

// route /api/room/[room_id]
export type DataResponseRoom = {
    id: string
    room_data: DatabaseRoomData
}

export type DatabaseRoomData = {
    actualPlayers: number
    maxPlayers: number
    started: boolean
}