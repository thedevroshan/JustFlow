import { Response, Request } from "express";

// Utils
import { StatusCode } from "../utils/StatusCode";
import { INTERNAL_SERVER_ERROR, BAD_REQUEST, NOT_FOUND } from "../utils/Errors";

// Models
import Project, { IProject, EScheduleViewStyle} from "../models/project.model";
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

        const newProject:IProject = await Project.create({name, createdBy: req.user._id, members: [req.user._id]})   
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
            msg: "Project Created Successfully",
            invitationLink: `${process.env.FRONTEND_URL}/projects/${newProject._id}/join`
        })
    } catch (error) {
        INTERNAL_SERVER_ERROR(res,():void=>{
            console.log(error)
        })
    }
}

// Edit Project
export const EditProjectInfo = async (req: Request, res: Response):Promise<void> => {
    try {
        const {projectId} = req.params;
        const {name, description} = req.body;

        if(!name) {
            BAD_REQUEST(res, "Name is required");
            return;
        }

        const project = await Project.findByIdAndUpdate(projectId, {name, description}, {new: true});

        res.status(StatusCode.OK).json({
            ok: true,
            msg: "Project updated successfully",
            project
        })
    } catch (error) {
        INTERNAL_SERVER_ERROR(res,():void=>{
            console.log(error)
        })
    }
}

// Remove Project Member
export const RemoveProjectMember = async (req: Request, res: Response):Promise<void> => {
    try {
        const {projectId, memberId} = req.params;

        if(!memberId || !projectId) {
            BAD_REQUEST(res, "Project ID and Member ID Params are required");
            return;
        }

        const project = await Project.findByIdAndUpdate(projectId, {$pull: {members: memberId}}, {new: true});
        await User.findByIdAndUpdate({_id: memberId}, {$pull: {joinedProject: projectId}})

        res.status(StatusCode.OK).json({
            ok: true,
            msg: "Member removed from project successfully",
            project
        })
    } catch (error) {
        INTERNAL_SERVER_ERROR(res,():void=>{
            console.log(error)
        })
    }
}

// Archive Project
export const ArchiveProject = async (req: Request, res: Response):Promise<void> => {
    try {
        const {projectId} = req.params;

        if(!projectId) {
            BAD_REQUEST(res, "Project ID Params is required");
            return;
        }

        const project = await Project.findByIdAndUpdate(projectId, {isArchived: true}, {new: true});

        res.status(StatusCode.OK).json({
            ok: true,
            msg: "Project archived successfully",
            project
        })
    } catch (error) {
        INTERNAL_SERVER_ERROR(res,():void=>{
            console.log(error)
        })
    }
}

// Unarchive Project
export const UnarchiveProject = async (req: Request, res: Response):Promise<void> => {
    try {
        const {projectId} = req.params;

        if(!projectId) {
            BAD_REQUEST(res, "Project ID Params is required");
            return;
        }       

        const project = await Project.findByIdAndUpdate(projectId, {isArchived: false}, {new: true});

        res.status(StatusCode.OK).json({
            ok: true,
            msg: "Project unarchived successfully",
            project
        })
    } catch (error) {
        INTERNAL_SERVER_ERROR(res,():void=>{
            console.log(error)
        })
    }
}


// Join Project
export const JoinProject = async (req: Request, res: Response):Promise<void> => {
    try {
        const {projectId} = req.params;

        if(!projectId) {
            BAD_REQUEST(res, "Project ID Params is required");
            return;
        }

        const project = await Project.findById(projectId);

        if(!project) {
            NOT_FOUND(res, "Project not found");
            return;
        }

        if(project.members.includes(req.user.id)) {
            BAD_REQUEST(res, "You are already a member of this project");
            return;
        }

        project.members.push(req.user.id)
        await project.save()
        
        await User.findByIdAndUpdate({_id: req.user.id}, {$push: {joinedProject: projectId}})

        res.status(StatusCode.OK).json({
            ok: true,
            msg: "Joined project successfully",
            project
        })
    }
    catch (error) {
        INTERNAL_SERVER_ERROR(res,():void=>{
            console.log(error)
        })
    }
}

// Change Schedule View Style 
export const ChangeScheduleViewStyle = async (req: Request, res: Response):Promise<void> => {
    try {
        const {view} = req.query;
        const {projectId} = req.params;

        const isProject = await Project.findById(projectId)
        if(!isProject){
            res.status(StatusCode.NOT_FOUND).json({
                ok: false,
                msg: 'Project Not Found'
            })
            return;
        }

        const style = Object.keys(EScheduleViewStyle).find(style => style === view?.toString().toUpperCase()) as keyof typeof EScheduleViewStyle
        if(style === undefined){
            res.status(StatusCode.NOT_FOUND).json({
                ok: false,
                msg: 'Style you provided is not available'
            })
            return;
        }

        isProject.scheduleViewStyle = EScheduleViewStyle[style]
        await isProject.save()

        res.status(StatusCode.OK).json({
            ok: true,
            msg:'Style Updated Successfully'
        })        
    } catch (error) {
        INTERNAL_SERVER_ERROR(res, () => {
            console.log(error)
        })
    }
}

// Get Schedule View Style
export const ScheduleViewStyle = async (req: Request, res: Response):Promise<void> => {
    try {
        const {projectId} = req.params

        const isProject = await Project.findById(projectId)
        if(!isProject){
            res.status(StatusCode.NOT_FOUND).json({
                ok: false,
                msg: 'Project Not Found'
            })
            return;
        }

        res.status(StatusCode.OK).json({
            ok: true,
            msg: 'View style fetched successfully',
            view: isProject.scheduleViewStyle
        })
    } catch (error) {
        INTERNAL_SERVER_ERROR(res, ()=>{
            console.log(error)
        })
    }
}


// Get Invitation Link
export const GetInvitationLink = async (req: Request, res: Response):Promise<void> => {
    try {
        const {projectId} = req.params;

        if(!projectId) {
            BAD_REQUEST(res, "Project ID Params is required");
            return;
        }       

        const project = await Project.findById(projectId);

        if(!project) {
            NOT_FOUND(res, "Project not found");
            return;
        }

        res.status(StatusCode.OK).json({
            ok: true,
            msg: "Invitation link fetched successfully",
            invitationLink: `${process.env.FRONTEND_URL}/projects/${projectId}/join`
        })
    }
    catch (error) {
        INTERNAL_SERVER_ERROR(res,():void=>{
            console.log(error)
        })
    }
}

// Get Project Members
export const GetProjectMembers = async (req: Request, res: Response):Promise<void> => {
    try {
        const {projectId} = req.params;
        
        if(!projectId) {
            BAD_REQUEST(res, "Project ID Params is required");
            return;
        }

        const project = await Project.findById(projectId);

        if(!project) {
            NOT_FOUND(res, "Project not found");
            return;
        }

        const members = await User.find({_id: {$in: project.members}});
        res.status(StatusCode.OK).json({
            ok: true,
            msg: "Project members fetched successfully",
            members
        })        
    }
    catch(error){
        INTERNAL_SERVER_ERROR(res,():void=>{
            console.log(error)
        })
    }
}

// Get Project
export const GetProject = async (req: Request, res: Response):Promise<void> => {
    try {
        const {projectId} = req.params;

        if(!projectId) {
            BAD_REQUEST(res, "Project ID Params is required");
            return;
        }   

        const project = await Project.findById(projectId);  

        if(!project) {
            NOT_FOUND(res, "Project not found");
            return;
        }       

        if(!project.members.includes(req.user.id)) {
            BAD_REQUEST(res, "You are not a member of this project");
            return;
        }

        res.status(StatusCode.OK).json({
            ok: true,
            msg: "Project fetched successfully",
            project
        })
    }
    catch(error){
        INTERNAL_SERVER_ERROR(res,():void=>{
            console.log(error)
        })
    }
    
}

// Get All Project
export const GetAllProject = async (req: Request, res: Response):Promise<void> => {
    try {
        const projects = await Project.find({createdBy: req.user.id});
        const joinedProjects = await Project.find({members: req.user.id, createdBy: {$ne: req.user.id}});

        if(projects.length == 0 && joinedProjects.length == 0) {
            NOT_FOUND(res, "No projects found");
            return;
        }

        res.status(StatusCode.OK).json({
            ok: true,
            msg: "All projects fetched successfully",
            projects,
            joinedProjects
        })
    }
    catch(error){
        INTERNAL_SERVER_ERROR(res,():void=>{
            console.log(error)
        })
    }
    
}

// Delete Project
export const DeleteProject = async (req: Request, res: Response):Promise<void> => {
    try {
        const {projectId} = req.params;

        if(!projectId) {
            BAD_REQUEST(res, "Project ID Params is required");
            return;
        }
        
        await User.findByIdAndUpdate({_id: req.user.id}, {$pull: {projects: projectId}});
        await User.updateMany({joinedProject: projectId}, {$pull: {joinedProject: projectId}})
        await Project.findByIdAndDelete(projectId);

        res.status(StatusCode.OK).json({
            ok: true,
            msg: "Project deleted successfully",
        })
    }catch(error){
        INTERNAL_SERVER_ERROR(res,():void=>{
            console.log(error)
        })
    }
}


