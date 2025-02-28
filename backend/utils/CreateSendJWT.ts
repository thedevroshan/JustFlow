import jwt, {JwtPayload} from "jsonwebtoken"
import { Response } from "express"

//  Utils
import { INTERNAL_SERVER_ERROR } from "./Errors"

// Types
import { IUser } from "../models/user.model"
import { StatusCode } from "./StatusCode"

export interface LoginSessionPayload extends JwtPayload {
    userId: string
}

export const  CreateSendJWT = async (user:IUser , res: Response):Promise<void> => {
    try {
        const token:string = jwt.sign({userId: user._id}, process.env.JWT_SECRET as string, {expiresIn: "28d", algorithm: "HS512"});

        process.env.NODE_ENV as string === 'development'?res.status(StatusCode.OK).json({ok: true, msg: 'Logged In',token}):res.cookie('login_session', token)
    } catch (error) {
        INTERNAL_SERVER_ERROR(res, ():void => {
            console.log(error)
        })
    }
}