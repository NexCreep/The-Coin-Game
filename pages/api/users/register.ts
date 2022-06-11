import { NextApiRequest, NextApiResponse } from "next";
import SignServices from "../../../helpers/security/signservices";


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
){
    const signServices = new SignServices()

    console.log(req.headers["user-agent"]?.includes("Mozilla/5.0"));

    var token = await signServices.signTokenWithRSA({host: req.headers["user-agent"]})

    res.send(`The token:\n ${token}`)
}
