import { Request, Response, NextFunction } from "express";
import jwt, {JwtPayload, VerifyCallback} from 'jsonwebtoken'

// Utils
import { INTERNAL_SERVER_ERROR } from "../utils/Errors";
import { StatusCode } from "../utils/StatusCode";
import User, { IUser } from "../models/user.model";

import { JWTSessionPayload } from "../utils/CreateSendJWT";


declare module 'express-serve-static-core' {
    interface Request {
        user: IUser;
    }
}

export const IsLoggedIn = async (req: Request, res: Response, next: NextFunction):Promise<void> => {
    try {
        const {login_session} = req.cookies;
        if(!login_session){
            res.status(StatusCode.NOT_FOUND).json({
                ok: false,
                msg: "Login Session Not Found"
            })
            return;
        }

        const decryptedLoginSession = jwt.verify(login_session, process.env.JWT_SECRET as string) as JWTSessionPayload;
        if(!decryptedLoginSession || !decryptedLoginSession.userId){
            res.status(StatusCode.BAD_REQUEST).json({
                ok: false,
                msg: "Invalid Login Session"
            })
            return;
        }

        const isUser:IUser | null = await User.findById(decryptedLoginSession.userId)
        if(!isUser){
            res.status(StatusCode.NOT_FOUND).json({
                ok: false,
                msg: "User Not Found"
            })
            return;
        }

        req.user = isUser;

        next()
    } catch (error) {
        INTERNAL_SERVER_ERROR(res, ():void => {
            console.log(error)
        })
    }
}