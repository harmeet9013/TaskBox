import { Schema, Types, model, models } from "mongoose";

const taskModel = new Schema(
    {
        key: { type: String, required: true },
        task: { type: String, required: true },
        is_done: { type: Boolean, required: false },
        author: { type: Types.ObjectId, ref: "User", required: true },
    },
    { timestamps: true }
);

export default models.Task || model("Task", taskModel);
