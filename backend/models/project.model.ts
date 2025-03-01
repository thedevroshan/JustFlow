import mongoose from "mongoose";
import { Schema,Document,Model, model } from "mongoose";


export interface IProject extends Document {
    name: string;
    description: string;
    projectIcon: string;
    members: Schema.Types.ObjectId[];
    tasks: Schema.Types.ObjectId[];
    docs: Schema.Types.ObjectId[];
    boards: Schema.Types.ObjectId[];
    isArchived: boolean;
    createdBy: Schema.Types.ObjectId;
}

const ProjectSchema: Schema<IProject> = new Schema<IProject>({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: ''
    },
    projectIcon: {
        type: String,
        default: ''
    },
    members: {
        type: [Schema.Types.ObjectId],
        default: []
    },
    tasks: {
        type: [Schema.Types.ObjectId],
        default: []
    },
    docs: {
        type: [Schema.Types.ObjectId],
        default: []
    },
    boards: {
        type: [Schema.Types.ObjectId],
        default: []
    },
    isArchived: {
        type: Boolean,
        default: false
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        required: true
    }
}, {timestamps: true})

const Project:Model<IProject> = model<IProject>("Project", ProjectSchema)

export default Project;
