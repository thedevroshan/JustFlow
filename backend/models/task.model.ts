import mongoose from "mongoose";
import {Schema} from "mongoose";
import { Document } from "mongoose";
import { Model } from "mongoose";

enum Status {
    NOT_STARTED = "NOT_STARTED",
    IN_PROGRESS = "IN_PROGRESS",
    CANCELLED = "CANCELLED",
    DONE = "DONE"
}

export interface ITask extends Document {
    deadline: string;
    status: Status;
    createdBy: Schema.Types.ObjectId;
    assignedTo: Schema.Types.ObjectId[];
    task: string;
    projectId: Schema.Types.ObjectId;
}

const TaskScheam:Schema<ITask> = new Schema<ITask>({
    deadline: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: Object.values(Status),
        default: Status.NOT_STARTED,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    assignedTo: {
        type: [Schema.Types.ObjectId],
        ref: "Role",
    },
    task: {
        type: String,
        required: true,
        default: "",
    },
    projectId: {
        type: Schema.Types.ObjectId,
        ref: "Project",
    },
}, {timestamps: true});

const Task:Model<ITask> = mongoose.model<ITask>("Task", TaskScheam);

export default Task;

