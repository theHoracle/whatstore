import axios, { AxiosResponse } from 'axios';
import applyCaseMiddleware from 'axios-case-converter';
import { useAuth } from '@clerk/nextjs';

const baseConfig = {
  baseURL: process.env.NEXT_PUBLIC_API_URL,
};

const clientApi = applyCaseMiddleware(axios.create(baseConfig));

clientApi.interceptors.request.use(async (config) => {
  const { getToken } = useAuth();
  const token = await getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

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

export default clientApi;
