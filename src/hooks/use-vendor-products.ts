import { apiClient } from "@/lib/api/client";
import { useQuery } from "@tanstack/react-query";
import { Product } from "@/types/api";

interface ProductsResponse {
  data: Product[];
  total: number;
  page: number;
  per_page: number;
}

export const useStoreProducts = () => {
  return useQuery({
    queryKey: ["vendor-products"],
    queryFn: async () => {
      const response = await apiClient.get<ProductsResponse>("/products");
      return response.data;
    },
  });
};