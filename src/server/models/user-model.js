import { Schema, Types, model, models } from "mongoose";

const userModel = new Schema(
    {
        key: { type: String, required: true },
        name: { type: String, required: true },
        tasks: [{ type: Types.ObjectId, ref: "Task", required: true }],
    },
    { timestamps: true }
);

export default models.User || model("User", userModel);
