import { uid } from "@/resources";
import {
    connectMongoDb,
    errorResponse,
    successResponse,
    taskModel,
    userModel,
} from "@/server";

export const GET = async (request) => {
    const user_id = request.nextUrl.searchParams.get("user");

    if (!user_id) {
        return errorResponse("User ID is required!");
    }

    const { status: connectDb } = await connectMongoDb();

    if (!!connectDb) {
        try {
            const user_db_id = await userModel
                .findOne({ key: user_id })
                .select("_id");
            const tasks = await taskModel
                .find({ author: user_db_id })
                .populate("author")
                .select("-_id key task author")
                .sort({ updatedAt: -1 });

            return successResponse("Tasks fetched successfully", [...tasks]);
        } catch (error) {
            return errorResponse(error?.message, error);
        }
    }

    return errorResponse("Cannot connected to DB");
};

export const POST = async (request) => {
    const request_body = await request.json();
    const user_id = request.nextUrl.searchParams.get("user");

    if (!user_id || !request_body?.task) {
        return errorResponse("User ID or Task is required!");
    }

    const { status: connectDb } = await connectMongoDb();

    if (!!connectDb) {
        try {
            const user_db_id = await userModel
                .findOne({ key: user_id })
                .select("_id");

            let new_task = await new taskModel({
                key: uid.rnd(),
                task: request_body?.task,
                is_done: false,
                author: user_db_id,
            }).save();

            new_task = {
                key: new_task?.key,
                task: new_task?.task,
                author: new_task?.author,
            };

            return successResponse("Tasks created successfully", new_task);
        } catch (error) {
            return errorResponse(error);
        }
    }

    return errorResponse("Cannot connected to DB");
};
