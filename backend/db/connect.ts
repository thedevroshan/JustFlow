import mongoose from "mongoose";

export const connectDB = async ():Promise<void> => {
    try {
        await mongoose.connect(process.env.MONGO_URI as string);
        console.log("Connected to MongoDB");
    } catch (error) {
        if(process.env.NODE_ENV as string === "development"){
            console.log(error);
            return;
        }
        console.log("Error connecting to MongoDB");
    }
}
