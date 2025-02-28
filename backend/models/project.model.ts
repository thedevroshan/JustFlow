import mongoose from "mongoose";
import { Schema,Document,Model, model } from "mongoose";


export interface IProject extends Document {
    user: Schema.Types.ObjectId;
    name: string;
    projectIcon: string;
    members: Schema.Types.ObjectId[];
    tasks: Schema.Types.ObjectId[];
    docs: Schema.Types.ObjectId[];
    boards: Schema.Types.ObjectId[];
}

const ProjectSchema: Schema<IProject> = new Schema<IProject>({
    user: {
        type: Schema.Types.ObjectId,
        required: true
    },
    name: {
        type: String,
        required: true,
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
}, {timestamps: true})

export const Project:Model<IProject> = model<IProject>("Project", ProjectSchema)