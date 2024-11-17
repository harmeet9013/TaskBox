import { default as api } from "axios";
//
import { API_URL } from "@/config";

export const axios = api.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});
