import { NextApiRequest, NextApiResponse } from "next";
import { DataResponseRoom } from "../../../@types/api";

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<DataResponseRoom>
) {
    const { room_id } = req.query

    res.status(200).json({ 
        id: room_id.toString() == "LOL" ? "LOL" : "-255",
        located: true
    })
}
  