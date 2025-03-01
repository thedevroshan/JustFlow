import jwt, {JwtPayload} from 'jsonwebtoken'
import { INTERNAL_SERVER_ERROR } from './Errors'
import { Response } from 'express'
import { JWTSessionPayload } from './CreateSendJWT'
import { StatusCode } from './StatusCode'

export const ValidateJWT = async (res: Response, token:string):Promise<void | string> =>{
    try {
        const decryptedToken = jwt.verify(token, process.env.JWT_SECRET as string) as JWTSessionPayload;
        if(!decryptedToken || !decryptedToken.userId){
            res.status(StatusCode.BAD_REQUEST).json({
                ok: false,
                msg: 'Invalid Token'
            })
            return;
        }

        return decryptedToken.userId;
    } catch (error) {
        INTERNAL_SERVER_ERROR(res, ():void=>{
            console.log(error)
        })
    }
}