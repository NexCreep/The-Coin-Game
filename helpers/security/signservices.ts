import * as fs from 'fs'
import * as jwt  from 'jsonwebtoken'
import {v4} from 'uuid'
import { DataResponseSign, SignTransfer } from '../../@types/api';

class SignServices{
    KEY;

    constructor(){
        this.KEY = fs.readFileSync('./helpers/security/keys/private.key');
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
