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
  avatarUrl: string;
  createdAt: string;
  updatedAt: string;
  vendor?: Vendor;
  userDetails?: UserDetails;
  orders?: Order[];
}
