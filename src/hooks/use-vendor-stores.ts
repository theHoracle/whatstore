import { apiClient } from "@/lib/api/client";
import { useQuery } from "@tanstack/react-query";
import type { Store, Product, Service } from "@/types/api";


interface StoreResponse {
  data: {
    products: Product[];
    services: Service[];
  };
  total: number;
  page: number;
  per_page: number;
}

export const useVendorStores = (vendorId: number) => {
  return useQuery({
    queryKey: ["vendor-stores", vendorId],
    queryFn: async () => {
      const response = await apiClient.get<Store[]>(`stores/vendor/${vendorId}`); 
      return response.data
  
    },
  });
};

export const useStoreCatalog = (storeId: number) => {
  return useQuery({
    queryKey: ["store-catalog", storeId],
    queryFn: async () => {
      const response = await apiClient.get<StoreResponse>(`/stores/${storeId}/catalog`);
      return response.data;
    },
  });
};

export const useStoreProducts = (storeId: number) => {
  return useQuery({
    queryKey: ["store-products", storeId],
    queryFn: async () => {
      const response = await apiClient.get<Product[]>(`/stores/${storeId}/products`);
      return response.data;
    },
  });
};

export const useStoreServices = (storeId: number) => {
  return useQuery({
    queryKey: ["store-services", storeId],
    queryFn: async () => {
      const response = await apiClient.get<Service[]>(`/stores/${storeId}/services`);
      return response.data;
    },
  });
};