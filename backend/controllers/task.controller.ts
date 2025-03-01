import { Request, Response } from "express";

// Utils
import { 
    INTERNAL_SERVER_ERROR,
    BAD_REQUEST,
    NOT_FOUND
 } from "../utils/Errors";

// Models
import Task from "../models/task.model";
import Project from "../models/project.model";

export const CreateTask = async (req: Request, res: Response):Promise<void> => {
    try {
        const { task, deadline } = req.body;
        const { projectId } = req.params;

        if(!task || !deadline || !projectId) {
            BAD_REQUEST(res, "Task, deadline and projectId are required");
            return;
        }

        const project = await Project.findById(projectId);
        if(!project) {
            NOT_FOUND(res, "Project not found");
            return;
        }

        const newTask = await Task.create({ task, deadline, projectId, createdBy:req.user._id });

        project.tasks.push(newTask.id);
        await project.save();

        res.status(201).json({ 
            ok:true,
            message:"Task created successfully",
            task: newTask
         });
    } catch (error) {
        INTERNAL_SERVER_ERROR(res, ():void => {
            console.log(error);
        });
    }
};
