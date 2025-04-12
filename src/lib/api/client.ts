import axios, { AxiosResponse } from 'axios';
import applyCaseMiddleware from 'axios-case-converter';

const baseConfig = {
  // Use relative URL to hit our Next.js API routes
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
};

const clientApi = applyCaseMiddleware(axios.create(baseConfig));

// Remove the token interceptor as it's handled by the proxy
clientApi.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API error:', error);
    return Promise.reject(error);
  }
);

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
