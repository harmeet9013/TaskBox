export const successResponse = async (
    message = "Action performed",
    data = {}
) => {
    return Response.json(
        { status: true, message: message, data: data },
        { status: 200 }
    );
};

export const errorResponse = async (
    message = "Action not performed",
    data = {}
) => {
    return Response.json(
        { status: false, message: message, data: data },
        { status: 200 }
    );
};
