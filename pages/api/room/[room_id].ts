import { NextApiRequest, NextApiResponse } from "next";
import { DatabaseRoomData, DataResponseRoom } from "../../../@types/api";
import RealTDB from "../../../helpers/firebase/database";


const roomGetMethod = async (room_id: string) => {
    var realTDB = new RealTDB()

    return await realTDB.getRoomOnce(room_id)
}


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const { room_id } = req.query
    var response: any = {error: false};

    switch (req.method?.toUpperCase()){
        case "GET":
            response = await roomGetMethod(room_id.toString())
            break;
        default:
            res.status(400).send("Bad method request")
    }

    if (!response.error)
        res.status(200).json({id: room_id.toString(), room_data: response})
    else
        res.status(200).json(response)
        

    
}
  