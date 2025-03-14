import jwt, {JwtPayload} from "jsonwebtoken"
import { Response } from "express"

//  Utils
import { INTERNAL_SERVER_ERROR } from "./Errors"

// Types
import { IUser } from "../models/user.model"
import { StatusCode } from "./StatusCode"

export interface JWTSessionPayload extends JwtPayload {
    userId: string
}

export const  CreateSendJWT = async (user:IUser , res: Response):Promise<void | string> => {
    try {
        const token:string = jwt.sign({userId: user._id}, process.env.JWT_SECRET as string, {expiresIn: "28d", algorithm: "HS512"});

        res.cookie('login_session', token, {
            httpOnly:true,
            secure: true,
            sameSite: 'none'
        })
        return token;
    } catch (error) {
        INTERNAL_SERVER_ERROR(res, ():void => {
            console.log(error)
        })
    }
}