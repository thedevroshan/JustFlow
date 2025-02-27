import { Schema,Model,model, Document, mongo } from "mongoose";

export interface IVerificationEmailSession extends Document {
    userId: string;
    email: string;
    expiresAt: number;
}

const VerificationEmailSessionSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    expiresAt: {
        type: Number,
        required: true
    }
}, {timestamps:true})

const VerificationEmailSession:Model<IVerificationEmailSession> = model<IVerificationEmailSession>("VerificationEmailSession", VerificationEmailSessionSchema);

export default VerificationEmailSession;