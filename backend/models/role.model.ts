import mongoose from "mongoose";
import {Schema} from "mongoose";
import { Document } from "mongoose";
import { Model } from "mongoose";


export interface IRole extends Document {
    name: string;
    icon: string;
    color: string;
}

const RoleSchema:Schema<IRole> = new Schema<IRole>({
    name: {
        type: String,
        required: true
    },
    icon: {
        type: String,
        default: ''
    },
    color: {
        type: String,
        required: true
    }
}, {timestamps: true});

const Role:Model<IRole> = mongoose.model<IRole>("Role", RoleSchema);

export default Role;

