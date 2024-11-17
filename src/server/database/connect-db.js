import mongoose from "mongoose";
//
import { MONGODB_URI } from "@/config";

export const connectMongoDb = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        return { status: true };
    } catch (error) {
        console.log("DB NOT CONNECTED", error);
        return { status: false };
    }
};
