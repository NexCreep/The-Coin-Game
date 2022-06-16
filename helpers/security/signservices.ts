import * as fs from 'fs'
import * as jwt  from 'jsonwebtoken'
import {v4} from 'uuid'
import { DataResponseSign, SignTransfer } from '../../@types/api';

class SignServices{
    KEY;

    constructor(){
        try {
            this.KEY = fs.readFileSync('./helpers/security/keys/private.key').toString("utf-8");    
        } catch (error) {
            this.KEY = process.env.security_rsa_private_key?.toString()
        }

        if(this.KEY == "NO_SECRET_AVAILIBLE")
            throw Error("THERE IS NO KEY AVALIBLE")
        
    }

    async signTokenWithRSA(toTokenize: string | object | Buffer) : Promise<SignTransfer> {
        var token: string = jwt.sign({content: toTokenize}, this.KEY, {algorithm: 'RS256'})
        
        return {
            uuidv4: v4(),
            public:{
                token: token,
                signedAt: new Date().toUTCString()
            }
        }
    }
}


export default SignServices
