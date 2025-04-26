import apiClient from "./apiClient";

export const getClientUrls = async () => {
    const response = (await apiClient.get("/urls"));
    return response.data;
}

export const createUrl = async (url: string) => {
    const response = (await apiClient.post("/urls", { origin_url: url }));
    return response.data;
}