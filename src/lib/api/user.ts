import { User } from "@/types/api";
import { apiClient } from "@/lib/api"

const getClientSideUser = async (): Promise<User | null> => {  
    const res = await apiClient.get<User>('/users/me');
    if (res.status !== 200) {
        throw new Error('Failed to fetch user');
    }
    return res.data;
}

export { getClientSideUser };