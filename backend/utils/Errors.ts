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

export const BAD_REQUEST = (res: Response,msg:string):void => {
    res.status(StatusCode.BAD_REQUEST).json({
        ok: false,
        msg
    })
}

export const NOT_FOUND = (res: Response,msg:string):void => {
    res.status(StatusCode.NOT_FOUND).json({
        ok: false,
        msg
    })
}

export const FORBIDDEN = (res: Response,msg:string):void => {
    res.status(StatusCode.FORBIDDEN).json({
        ok: false,
        msg
    })
}
