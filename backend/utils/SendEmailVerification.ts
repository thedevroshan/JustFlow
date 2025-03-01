import { Transporter } from "./Transporter";
import fs from "fs/promises";
import path from "path";
import VerificationEmailSession from "../models/verification-email-session.model";
import jwt from 'jsonwebtoken'

export const SendEmailVerification = async (email:string, name:string,userId:string):Promise<boolean> => {
    try {
        const htmlContent = await fs.readFile(path.join(__dirname, "../public/email-verification-page/email-verification.html"), "utf-8");

        const verificationToken = await jwt.sign({userId}, process.env.JWT_SECRET as string, {algorithm: 'HS512', expiresIn: '2m'})

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Verify Your Email",
            html: htmlContent.replace("{{verificationLink}}", `${process.env.BACKEND_URL}/api/auth/verify/${verificationToken}`)
        }
        await VerificationEmailSession.create({
            userId,
            email,
            expiresAt: Date.now() + 2 * 60 * 1000 // 2 minutes
        });
        await Transporter.sendMail(mailOptions);
        return true;
    } catch (error) {
        if(process.env.NODE_ENV as string === "development"){
            console.log(error);
            return false;
        }
        return false;
    }
}
