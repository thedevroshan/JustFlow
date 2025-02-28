import { z } from "zod";
import { Request, Response, NextFunction } from "express";
import { StatusCode } from "../utils/StatusCode";

const RegistrationSchema = z.object({
    name: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(8).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
        message: "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    }),
})

export const RegistrationSchemaCheck = (req: Request, res: Response, next: NextFunction):void => {
    try {
        const { success, error } = RegistrationSchema.safeParse(req.body);
        if(!success){
            res.status(StatusCode.BAD_REQUEST).json({
                ok: false,
                message: "Invalid Request Body",
                error: JSON.parse(error.message)
            })
            return;
        }
        next();
    } catch (error) {
        if(process.env.NODE_ENV as string === "development"){
            console.log(error);
            return;
        }
        res.status(StatusCode.BAD_REQUEST).json({
            ok: false,
            message: "Invalid Request Body"
        })
    }
}


