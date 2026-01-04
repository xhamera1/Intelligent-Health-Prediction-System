import { ENDPOINTS } from '../config/api.ts';
import type { PagedUsers, User } from "../utils/types";

const fetchApi = async (url: string, options: RequestInit) => {
    const response = await fetch(url,options);
    if(!response.ok){
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
            errorData.message || `Request failed with status ${response.status}`
        );
    }
    if (response.status === 204){
        return;
    }
    return response.json();
};

export const adminService = {
    getAllUsers: async (
        token: string,
        page: number,
        size: number
    ): Promise<PagedUsers> => {
        const url = new URL(ENDPOINTS.ADMIN_USERS);
        url.searchParams.append("page", page.toString());
        url.searchParams.append("size", size.toString());
        url.searchParams.append("sort", "id,asc");

        return fetchApi(url.toString(), {
            headers: { Authorization: `Bearer ${token}` },
        });
    },
    updateUser: async (
        token: string,
        userId: number,
        userData: Partial<User>
    ): Promise<User> => {
        return fetchApi(`${ENDPOINTS.ADMIN_USERS}/${userId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(userData),
        });
    },

    deleteUser: async (token: string, userId: number): Promise<void> => {
        return fetchApi(`${ENDPOINTS.ADMIN_USERS}/${userId}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` }
        });
    },

    getAllPredictionHistory: async (token: string, page: number, size: number) => {
        const url = new URL(ENDPOINTS.PREDICTION_HISTORY);
        url.searchParams.append("page", page.toString());
        url.searchParams.append("size", size.toString());

        return fetchApi(url.toString(), {
            headers: { Authorization: `Bearer ${token}` }
        });
    }
}