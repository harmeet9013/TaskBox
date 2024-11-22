import {
    userModel,
    taskModel,
    errorResponse,
    connectMongoDb,
    successResponse,
} from "@/server";
import { uid } from "@/resources";
import mongoose from "mongoose";

const getUserDetailsWithoutTasks = async (user_id, document_id) => {
    const logged_user = await userModel.findOne({
        ...(document_id
            ? {
                  _id: document_id,
              }
            : { key: user_id }),
    });

    return logged_user;
};

const getUserDetailsWithTasks = async (user_id, document_id) => {
    const logged_user = await userModel
        .findOne({
            ...(document_id
                ? {
                      _id: document_id,
                  }
                : { key: user_id }),
        })
        .populate({
            path: "tasks",
            select: "-_id -__v -author",
            options: { sort: { createdAt: -1 } },
        });

    return logged_user;
};

export const GET = async (request) => {
    const user_id = request.nextUrl.searchParams.get("user");

    if (!user_id) {
        return errorResponse("User ID is required!");
    }

    const { status: connectDb } = await connectMongoDb();

    if (!!connectDb) {
        try {
            let logged_user = await getUserDetailsWithTasks(user_id);

            return successResponse("Tasks fetched successfully", logged_user);
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
        const session = await mongoose.startSession();

        try {
            session.startTransaction();

            let logged_user = await getUserDetailsWithoutTasks(user_id);

            let new_task = await new taskModel({
                key: uid.rnd(),
                task: request_body?.task,
                is_done: false,
                author: logged_user?._id,
            }).save();

            logged_user?.tasks?.push(new_task?._id);

            await logged_user?.save();

            logged_user = await getUserDetailsWithTasks(user_id);

            session.commitTransaction();

            return successResponse("Tasks created successfully", logged_user);
        } catch (error) {
            session.abortTransaction();
            return errorResponse(error?.message, error);
        }
    }

    return errorResponse("Cannot connected to DB");
};

export const PUT = async (request) => {
    const request_body = await request.json();

    if (!request_body?.key) {
        return errorResponse("Key is required");
    }

    const task_id = request_body?.key;

    const { status: connectDb } = await connectMongoDb();

    if (!!connectDb) {
        const session = await mongoose.startSession();

        try {
            session.startTransaction();

            let updated_task = await taskModel
                .findOne({ key: task_id })
                .select("createdAt updatedAt key task author is_done");

            updated_task.is_done = request_body?.is_done;

            await updated_task.save();

            session.commitTransaction();

            updated_task = {
                is_done: updated_task?.is_done,
                key: updated_task?.key,
                task: updated_task?.task,
                createdAt: updated_task?.createdAt,
                updatedAt: updated_task?.updatedAt,
            };

            return successResponse("Task updated successfully", updated_task);
        } catch (error) {
            session.abortTransaction();
            return errorResponse(error?.message, error);
        }
    }

    return errorResponse("Cannot connected to DB");
};

export const DELETE = async (request) => {
    const task_id = request.nextUrl.searchParams.get("task");

    if (!task_id) {
        return errorResponse("Task id is required!");
    }

    const { status: connectDb } = await connectMongoDb();

    if (!!connectDb) {
        const session = await mongoose.startSession();

        try {
            session.startTransaction();

            let task = await taskModel.findOneAndDelete({ key: task_id });
            let logged_user = await getUserDetailsWithoutTasks(
                undefined,
                task?.author
            );

            logged_user.tasks = logged_user?.tasks?.filter(
                (item) => !item?.equals(task?._id)
            );

            await logged_user?.save();

            logged_user = await getUserDetailsWithTasks(
                undefined,
                task?.author
            );

            session.commitTransaction();

            return successResponse("task deleted successfully", logged_user);
        } catch (error) {
            session.abortTransaction();
            return errorResponse(error?.message, error);
        }
    }

    return errorResponse("Cannot connected to DB");
};
