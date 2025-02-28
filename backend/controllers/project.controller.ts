import { Response, Request } from "express";

// Utils
import { StatusCode } from "../utils/StatusCode";
import { INTERNAL_SERVER_ERROR } from "../utils/Errors";

// Models
import { IProject, Project } from "../models/project.model";
import User from "../models/user.model";


export const CreateProject = async (req: Request, res: Response):Promise<void> => {
    try {
        const {name} = req.body;

        if(!name){
            res.status(StatusCode.BAD_REQUEST).json({
                ok: false,
                msg: "Name is required"
            })
            return;
        }

        const newProject:IProject = await Project.create({user: req.user._id, name})
        if(!newProject){
            res.status(StatusCode.BAD_REQUEST).json({
                ok: false,
                msg: "Unable to create project. Try again later."
            })
            return;
        }

        await User.updateOne({_id: req.user._id, $push: {
            projects: newProject._id
        }})


        res.status(StatusCode.CREATED).json({
            ok: true,
            msg: "Project Created Successfully"
        })
    } catch (error) {
        INTERNAL_SERVER_ERROR(res,():void=>{
            console.log(error)
        })
    }
}