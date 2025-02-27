import { Request, Response } from "express";
import bcryptjs from "bcryptjs";
import path from "path";
import jwt from "jsonwebtoken";

// Config
import { StatusCode } from "../config/statuscode.config";

// Models
import User, { IUser } from "../models/user.model";
import VerificationEmailSession, { IVerificationEmailSession } from "../models/verification-email-session.model";

// Utils
import { SendEmailVerification } from "../utils/SendEmailVerification";

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
        if(process.env.NODE_ENV as string === "development"){
            console.log(error);
            return;
        }
        res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
            ok: false,
            message: "Internal Server Error"
        })
    }
};

// Verify Email
export const VerifyEmail = async (req: Request, res: Response):Promise<void> => {
    try {
        const { userId, email } = req.params;

        const user:IUser | null = await User.findOne({_id: userId, email});
        if(!user){
            res.status(StatusCode.NOT_FOUND).json({
                ok: false,
                message: "User not found"
            })
            return;
        }

        const verificationEmailSession:IVerificationEmailSession | null = await VerificationEmailSession.findOne({userId, email});
        if(!verificationEmailSession){
            res.status(StatusCode.NOT_FOUND).json({
                ok: false,
                msg: "Verification email session not found"
            })
            return;
        }

        if(verificationEmailSession.expiresAt < Date.now()){
            await VerificationEmailSession.deleteOne({_id: verificationEmailSession._id});
            res.status(StatusCode.BAD_REQUEST).json({
                ok: false,
                msg: "Verification email session expired"
            })
            return;
        }

        if(user.isVerified){
            res.status(StatusCode.BAD_REQUEST).json({
                ok: false,
                message: "Email already verified"
            })
            return;
        }

        await VerificationEmailSession.deleteOne({_id: verificationEmailSession._id});
        user.isVerified = true;
        await user.save();

        res.sendFile(path.join(__dirname, "../public/email-verification-page/verified.html"));
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
        if(process.env.NODE_ENV as string === "development"){
            res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
                ok: false,
                message: "Internal Server Error"
            })
            return;
        }
        res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
            ok: false,
            message: "Internal Server Error"
        })
    }
}

// Login User
export const Login = async (req: Request, res: Response):Promise<void> => {
    try {
        const {password} = req.body;

        const isPasswordCorrect:boolean = await bcryptjs.compare(password, req.body.user.password);
        if(!isPasswordCorrect){
            res.status(StatusCode.BAD_REQUEST).json({
                ok: false,
                message: "Invalid password"
            })
            return;
        }

        const token:string = jwt.sign({userId: req.body.user._id}, process.env.JWT_SECRET as string, {expiresIn: "28d", algorithm: "HS512"});

        res.status(StatusCode.OK).json({
            ok: true,
            message: "Login successful",
            token
        })
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
