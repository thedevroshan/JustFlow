import { Request, Response, NextFunction } from "express";
import Project from "../models/project.model";
import { BAD_REQUEST, INTERNAL_SERVER_ERROR, NOT_FOUND } from "../utils/Errors";

export const IsAuthorizedToEditProject = async (req: Request, res: Response, next: NextFunction):Promise<void> => {
    try {
        const {projectId} = req.params;

        const project = await Project.findById(projectId);
        if(!project) {
            NOT_FOUND(res, "Project not found");
            return;
        }

        if(project.createdBy.toString() !== req.user.id) {
            BAD_REQUEST(res, "You are not authorized to edit this project");
            return; 
        }

        next();
    } catch (error) {
        INTERNAL_SERVER_ERROR(res,():void=>{
            console.log(error)
        })
    }
}

