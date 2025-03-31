import { auth } from '@clerk/nextjs/server';
import axios, { AxiosResponse } from 'axios';
import applyCaseMiddleware from 'axios-case-converter';

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

// Add type support for API calls
export const apiCall = {
  get: <T>(url: string) => api.get<T, AxiosResponse<T>>(url),
  post: <T>(url: string, data: any) => api.post<T, AxiosResponse<T>>(url, data),
  put: <T>(url: string, data: any) => api.put<T, AxiosResponse<T>>(url, data),
  delete: <T>(url: string) => api.delete<T, AxiosResponse<T>>(url),
};

export default api;
