import { auth } from '@clerk/nextjs/server';
import axios, { AxiosResponse } from 'axios';
import applyCaseMiddleware from 'axios-case-converter';
import { User } from '@/types/api';

const api = applyCaseMiddleware(axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
}));

api.interceptors.request.use(async (config) => {
  const { getToken } = await auth();
  const token = await getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Add type support for API calls with proper typing
export const apiCall = {
  get: <TResponse>(url: string) => 
    api.get<TResponse, AxiosResponse<TResponse>>(url),
  
  post: <TResponse, TRequest = unknown>(url: string, data: TRequest) => 
    api.post<TResponse, AxiosResponse<TResponse>, TRequest>(url, data),
  
  put: <TResponse, TRequest = unknown>(url: string, data: TRequest) => 
    api.put<TResponse, AxiosResponse<TResponse>, TRequest>(url, data),
  
  delete: <TResponse>(url: string) => 
    api.delete<TResponse, AxiosResponse<TResponse>>(url),
};

export async function getCurrentUser(): Promise<User | null> {
  try {
    const response = await apiCall.get<User>('/me');
    return response.data;
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
}

export default api;
