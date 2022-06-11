import * as fs from 'fs'
import * as path from 'path'
import * as jwt  from 'jsonwebtoken'

class SignServices{
    #KEY;

    constructor(){
        this.#KEY = fs.readFileSync('./helpers/security/keys/private.key');
    }

    async signTokenWithRSA(toTokenize: string | object | Buffer) : Promise<string> {
        var token: string = jwt.sign({content: toTokenize}, this.#KEY, {algorithm: 'RS256'})
        
        return token
    }
}


export default SignServices
