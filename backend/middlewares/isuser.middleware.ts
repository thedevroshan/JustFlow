import { Request, Response, NextFunction } from "express";
import User, { IUser } from "../models/user.model";
import { StatusCode } from "../config/statuscode.config";

export const IsUser = async (req: Request, res: Response, next: NextFunction):Promise<void> => {
    try {
        const {email, userId}:{email?:string, userId?:string} = req.body;

        const isUser:IUser | null = await User.findOne({email}) || await User.findById(userId);
        if(!isUser){
            res.status(StatusCode.NOT_FOUND).json({
                ok: false,
                message: "User not found"
            })
            return;
        }
        req.body.user = isUser;
        next();
    } catch (error) {
        if(process.env.NODE_ENV as string === "development"){
            console.log(error);
            return;
        }
        res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
            ok: false,
            message: "Internal Server Error"
        })
    }
}
