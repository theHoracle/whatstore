import { apiClient } from "@/lib/api/client";
import { useQuery } from "@tanstack/react-query";

interface OrderItem {
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
  price: number;
}

interface Order {
  id: number;
  userId: number;
  storeId: number;
  status: "pending" | "processing" | "completed" | "refunded";
  totalAmount: number;
  items: OrderItem[];
  createdAt: string;
  updatedAt: string;
}

interface OrdersResponse {
  data: Order[];
  total: number;
  page: number;
  per_page: number;
}

export const useVendorOrders = () => {
  return useQuery({
    queryKey: ["vendor-orders"],
    queryFn: async () => {
      const response = await apiClient.get<OrdersResponse>("/orders");
      return response.data;
    },
  });
};