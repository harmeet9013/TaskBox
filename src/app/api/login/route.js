//
import { uid } from "@/resources";
import {
    connectMongoDb,
    errorResponse,
    successResponse,
    userModel,
} from "@/server";

export const POST = async (request) => {
    const request_body = await request.json();
    let { username } = request_body;
    username = username?.trim()?.toLowerCase();
    let newUser;

    if (!username) {
        return errorResponse("Username is required");
    }

    const { status: dbConnected } = await connectMongoDb();

    if (!!dbConnected) {
        try {
            const existingUser = await userModel
                .findOne({ name: username })
                .select("key name -_id");

            if (!existingUser) {
                const newUserObject = {
                    key: uid.rnd(),
                    name: username,
                };

                newUser = await new userModel({ ...newUserObject }).save();
                newUser = {
                    key: newUser.key,
                    name: newUser.name,
                };
            }

            return successResponse(
                "Logged in successfully",
                newUser || existingUser
            );
        } catch (error) {
            console.log(error);
            return errorResponse(error);
        }
    }

    return errorResponse("Cannot connect to Database");
};
