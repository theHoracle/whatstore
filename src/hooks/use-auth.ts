import { getCurrentUser } from "@/lib/axios"
import { useQuery } from "@tanstack/react-query"

export const useAuth = () => {
    return useQuery({
        queryKey: ["auth-user"],
        queryFn: getCurrentUser,
        staleTime: 1000 * 60 * 60, // 1 hour
    })
}