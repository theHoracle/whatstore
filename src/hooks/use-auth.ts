
import { getClientSideUser } from "@/lib/api/user"
import { useQuery } from "@tanstack/react-query"

export const useAuth = () => {
    return useQuery({
        queryKey: ["auth-user"],
        queryFn: getClientSideUser,
        staleTime: 1000 * 60 * 60, // 1 hour
    })
}