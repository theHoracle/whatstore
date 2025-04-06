import axios, { AxiosResponse } from 'axios';
import applyCaseMiddleware from 'axios-case-converter';
import { User } from '@/types/api';
import { useAuth } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs/server';

// Base config
const baseConfig = {
  baseURL: process.env.NEXT_PUBLIC_API_URL,
};

// Client-side instance
const clientApi = applyCaseMiddleware(axios.create(baseConfig));

// Server-side instance
const serverApi = applyCaseMiddleware(axios.create(baseConfig));

// Client-side interceptor
clientApi.interceptors.request.use(async (config) => {
  const { getToken } = useAuth();
  const token = await getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Server-side interceptor
serverApi.interceptors.request.use(async (config) => {
  const { getToken } = await auth();
  const token = await getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Typed API calls for client
export const apiClient = {
  get: <TResponse>(url: string) => 
    clientApi.get<TResponse, AxiosResponse<TResponse>>(url),
  post: <TResponse, TRequest = unknown>(url: string, data: TRequest) => 
    clientApi.post<TResponse, AxiosResponse<TResponse>, TRequest>(url, data),
  put: <TResponse, TRequest = unknown>(url: string, data: TRequest) => 
    clientApi.put<TResponse, AxiosResponse<TResponse>, TRequest>(url, data),
  delete: <TResponse>(url: string) => 
    clientApi.delete<TResponse, AxiosResponse<TResponse>>(url),
};

// Typed API calls for server
export const apiServer = {
  get: <TResponse>(url: string) => 
    serverApi.get<TResponse, AxiosResponse<TResponse>>(url),
  post: <TResponse, TRequest = unknown>(url: string, data: TRequest) => 
    serverApi.post<TResponse, AxiosResponse<TResponse>, TRequest>(url, data),
  put: <TResponse, TRequest = unknown>(url: string, data: TRequest) => 
    serverApi.put<TResponse, AxiosResponse<TResponse>, TRequest>(url, data),
  delete: <TResponse>(url: string) => 
    serverApi.delete<TResponse, AxiosResponse<TResponse>>(url),
};

// Default export for client-side usage
export default clientApi;
