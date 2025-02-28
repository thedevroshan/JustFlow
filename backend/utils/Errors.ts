import { Response, Request } from "express"
import { StatusCode } from "./StatusCode";

export const INTERNAL_SERVER_ERROR = (res: Response,inDevEnv: ()=>void):void => {
    if(process.env.NODE_ENV as string === 'development'){
        inDevEnv()
        return;
    }
    res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
        ok: false,
        msg: 'Internal Server Error'
    })
}