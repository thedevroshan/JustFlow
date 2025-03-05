import { Request, Response } from "express";
import jwt from 'jsonwebtoken'
import fs from 'fs/promises'
import path from "path";
import bcryptjs from 'bcryptjs'

// Utils
import { StatusCode } from "../utils/StatusCode";
import { INTERNAL_SERVER_ERROR } from "../utils/Errors";
import { SendMail } from "../utils/SendMail";
import { ValidateJWT } from "../utils/ValidateJWT";

// Models
import User from "../models/user.model";



export const LoggedInUser = (req:Request, res:Response) => {
    res.status(StatusCode.OK).json({ok: true, msg: "User is logged in"})
}

export const ForgotPassword =async (req: Request, res:Response):Promise<void> => {
    try {
        const token = jwt.sign({userId: req.user.id}, process.env.JWT_SECRET as string, {'algorithm': 'HS512', expiresIn: '2m'})

        let htmlContent = await fs.readFile(path.join(__dirname, '../public/reset-password/reset-password.html'), 'utf-8')

        htmlContent = htmlContent.replace("{{resetPasswordLink}}", `${process.env.FRONTEND_URL}/reset-password?token=${token}`)

        const isSent = await SendMail(req.user.email, 'Reset Password', '',htmlContent)
        if(!isSent){
            res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
                ok:false,
                msg: 'Unable to send reset password link. Try again later.'
            })
        }

        res.status(StatusCode.OK).json({
            ok: true,
            msg: 'Reset Password mail sent to your email.'
        })
    } catch (error) {
        INTERNAL_SERVER_ERROR(res, ()=>{
            console.log(error)
        })
    }
}

// Reset Password
export const ResetPassword = async (req: Request, res:Response):Promise<void> => {
    try {
        const {token} = req.query;
        const {password, confirmPassword} = req.body;

        if(!token){
            res.status(StatusCode.NOT_FOUND).json({
                ok:false,
                msg: "Token Not Found"
            })
            return;
        }

        const userId:void | string = await ValidateJWT(res, token as string)

        if(password != confirmPassword){
            res.status(StatusCode.BAD_REQUEST).json({ok: false, msg: 'Password and Confirm Password must be same.'})
            return;
        }

        if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password) || password.length < 8){
            res.status(StatusCode.BAD_REQUEST).json({ok: false, msg: "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character"})
            return;
        }

        const salt = await bcryptjs.genSalt(12)
        const hashedPassword = await bcryptjs.hash(confirmPassword, salt)

        const isUpdated = await User.findByIdAndUpdate({_id: userId}, {$set: {
            password: hashedPassword
        }})

        if(!isUpdated){
            res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
                ok: false,
                msg: 'Unable to reset password. Try again later'
            })
            return;
        }

        res.status(StatusCode.OK).json({
            ok: true,
            msg: 'Password Changed Successfully'
        })
    } catch (error) {
        INTERNAL_SERVER_ERROR(res, ()=>{
            console.log(error)
        })
    }
}