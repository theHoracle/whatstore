import { User } from "@/types/api";
import { apiClient } from "./client";


export const getClientSideUser = async (): Promise<User | null> => { 
    try {
      
        console.log("Sending request to fetch user data");
        const res = await apiClient.get<User>('/users/me');

        if (res.status !== 200) {
            throw new Error('Failed to fetch user');
        }
        if (!res.data) {
            console.error('Invalid response format from API');
            throw new Error('Invalid server response');
        }
        
        return res.data;
    } catch (error) {
        console.error('Error fetching user:', error);
        return null; // Return null instead of throwing on auth errors
    }
};