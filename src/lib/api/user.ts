import { User } from "@/types/api";
import { apiClient, apiServer } from "@/lib/api"



const getServerSideUser = async () => {
    const res = await apiServer.get<User>('/users/me');
    if (res.status !== 200) {
        throw new Error('Failed to fetch user');
    }
    return res.data;
}

const getClientSideUser = async (): Promise<User | null> => {
    "use server"
    const res = await apiClient.get<User>('/users/me');
    if (res.status !== 200) {
        throw new Error('Failed to fetch user');
    }
    return res.data;
}

export { getServerSideUser, getClientSideUser };