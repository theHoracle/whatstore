import { Product, Service } from "@/features/vendors/onboarding/schema";

export type { Product, Service };
export interface Store {
  id: number;
  vendorId: number;
  name: string;
  description: string;
  storeLogo: string;
  storeUrl: string;
  storeWhatsappContact: string;
  storeAddress: string;
  createdAt: string;
  updatedAt: string;
  products?: Product[];
  services?: Service[];
  orders?: Order[];
}

export interface Vendor {
  id: number;
  userId: number;
  name: string;
  description: string;
  logo: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserDetails {
  id: number;
  userId: number;
  // Add other user details fields as needed
}

export interface Order {
  id: number;
  // Add order fields as needed
}

export interface User {
  id: number;
  clerkId: string;
  name: string;
  email: string;
  username: string;
  phone?: string;
  avatarUrl: string;
  createdAt: string;
  updatedAt: string;
  vendor?: Vendor;
  userDetails?: UserDetails;
  orders?: Order[];
}
