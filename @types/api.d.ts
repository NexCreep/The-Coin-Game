
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

//route /api/users/register
export type DataResponseSign = {
    token: string
    signedAt: string
    sendedAt?: string
}

export type SignTransfer = {
    uuidv4: string
    public: DataResponseSign
}