import { axios } from "@/resources";

export const GET_REQUEST = async (url, params = {}) => {
    return await axios
        .get(url, {
            params: params,
        })
        .then((response) => {
            return response?.data;
        })
        .catch((error) => {
            return {
                status: false,
                message:
                    error?.message ||
                    error?.data?.message ||
                    "Unexpected Error",
                data: false,
            };
        });
};

export const POST_REQUEST = async (
    url,
    data = {},
    params = {},
    headers = {}
) => {
    return await axios
        .post(url, data, {
            params: params,
            headers: {
                ...headers,
            },
        })
        .then((response) => {
            return response?.data;
        })
        .catch((error) => {
            return {
                status: false,
                message:
                    error?.message ||
                    error?.data?.message ||
                    "Unexpected Error",
                data: false,
            };
        });
};

export const PUT_REQUEST = async (url, data = {}, params = {}) => {
    return await axios
        .put(url, data, {
            params: params,
        })
        .then((response) => {
            return response?.data;
        })
        .catch((error) => {
            return {
                status: false,
                message:
                    error?.message ||
                    error?.data?.message ||
                    "Unexpected Error",
                data: false,
            };
        });
};

export const DELETE_REQUEST = async (url, params = {}) => {
    return await axios
        .delete(url, {
            params: params,
        })
        .then((response) => {
            return response?.data;
        })
        .catch((error) => {
            return {
                status: false,
                message:
                    error?.message ||
                    error?.data?.message ||
                    "Unexpected Error",
                data: false,
            };
        });
};
