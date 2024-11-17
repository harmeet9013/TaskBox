const PREFIX = "/api";

const appendURL = (data = []) => {
    return [PREFIX, ...data]?.join("/");
};

export const endpoints = {
    login: appendURL(["login"]),
    tasks: appendURL(["tasks"]),
};
