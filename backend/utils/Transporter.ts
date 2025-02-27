import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();


export const Transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER as string,
        pass: process.env.EMAIL_PASS as string,
    }
})
