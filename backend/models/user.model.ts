import mongoose from "mongoose";
import {Schema} from "mongoose";
import { Document } from "mongoose";
import { Model } from "mongoose";

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    isVerified: boolean;
    teams: Schema.Types.ObjectId[];
    projects: Schema.Types.ObjectId[];
}

const UserSchema:Schema<IUser> = new Schema<IUser>({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    teams: {
        type: [Schema.Types.ObjectId],
        ref: "Team",
        default: [],
    },
    projects: {
        type: [Schema.Types.ObjectId],
        ref: "Project",
        default: [],
    },
}, {timestamps: true});

const User:Model<IUser> = mongoose.model<IUser>("User", UserSchema);

export default User;

