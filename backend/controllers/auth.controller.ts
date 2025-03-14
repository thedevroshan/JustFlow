import { Request, Response } from "express";
import bcryptjs from "bcryptjs";
import path from "path";


// Models
import User, { IUser } from "../models/user.model";

// Utils
import { SendEmailVerification } from "../utils/SendEmailVerification";
import { StatusCode } from "../utils/StatusCode";
import { INTERNAL_SERVER_ERROR } from "../utils/Errors";
import { CreateSendJWT } from "../utils/CreateSendJWT";
import { ValidateJWT } from "../utils/ValidateJWT";

// Register User
export const Register = async (req: Request, res: Response):Promise<void> => {
    try {
        const { name, email, password } = req.body;

        const user:IUser | null = await User.findOne({email});
        if(user){
            res.status(StatusCode.BAD_REQUEST).json({
                ok: false,
                message: "User already exists"
            })
            return;
        }

        const salt:string = await bcryptjs.genSalt(10);
        const hashedPassword:string = await bcryptjs.hash(password, salt);

        const newUser:IUser = await User.create({
            name,
            email,
            password: hashedPassword,
        })

        const isEmailSent:boolean = await SendEmailVerification(email, name, newUser._id as string);
        if(!isEmailSent){
            res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
                ok: false,
                message: "Internal Server Error"
            })
            return;
        }

        res.status(StatusCode.CREATED).json({
            ok: true,
            message: "User created successfully",
        })
    } catch (error) {
        INTERNAL_SERVER_ERROR(res, ():void=>{
            console.log(error)
        })
    }
};

// Verify Email
export const VerifyEmail = async (req: Request, res: Response):Promise<void> => {
    try {
        const { verification_token } = req.params;      

        const userId = await ValidateJWT(res, verification_token);


        const user:IUser | null = await User.findById(userId)
        if(!user){
            res.status(StatusCode.NOT_FOUND).sendFile(path.join(__dirname, "../public/email-verification-page/invalid-verification-link.html"));
            return;
        }


        if(user.isVerified){
            res.status(StatusCode.BAD_REQUEST).json({
                ok: false,
                message: "Email already verified"
            })
            return;
        }

        user.isVerified = true;
        await user.save();

        res.status(StatusCode.OK).sendFile(path.join(__dirname, "../public/email-verification-page/verified.html"));
    } catch (error) {
        INTERNAL_SERVER_ERROR(res, ():void=>{
            console.log(error)
        })
    }
}

// Resend Verification Email
export const ResendVerificationEmail = async (req: Request, res: Response):Promise<void> => {
    try {
        const {user} = req.body;
        const isEmailSent:boolean = await SendEmailVerification(user.email, user.name, user._id as string);
        if(!isEmailSent){
            res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
                ok: false,
                message: "Internal Server Error"
            })
            return;
        }

        res.status(StatusCode.OK).json({
            ok: true,
            message: "Verification email sent successfully"
        })
    } catch (error) {
        INTERNAL_SERVER_ERROR(res, ():void=>{
            console.log(error)
        })
    }
}

// Login User
export const Login = async (req: Request, res: Response):Promise<void> => {
    try {
        const {password} = req.query;

        if(!req.user.isVerified){
            const isEmailSent:boolean = await SendEmailVerification(req.user.email, req.user.name, req.user._id as string)
            if(!isEmailSent){
                res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
                    ok: false,
                    message: "Internal Server Error"
                })
                return;
            }
            res.status(StatusCode.UNAUTHORIZED).json({
                ok: false,
                msg: "Email is not verified. We have sent you a email for verification. Check your spam folder or inbox"
            })
            return;
        }

        const isPasswordCorrect:boolean = await bcryptjs.compare(password as string, req.user.password);
        if(!isPasswordCorrect){
            res.status(StatusCode.BAD_REQUEST).json({
                ok: false,
                message: "Invalid password"
            })
            return;
        }

        const token:string | void = await CreateSendJWT(req.user,res);

        res.status(StatusCode.OK).json({
            ok: true,
            msg: 'Login Successful',
            token
        })
    } catch (error) {
        INTERNAL_SERVER_ERROR(res, ():void=>{
            console.log(error)
        })
    }
}


// Logout User
export const Logout = async (req: Request, res: Response):Promise<void> => {
    try {
        res.cookie("token", "", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 0,
            sameSite: "none"
        }).json({ok: true, msg: "Logged out successfully"})
    } catch (error) {
        INTERNAL_SERVER_ERROR(res, ():void=>{
            console.log(error)
        })
    }
}